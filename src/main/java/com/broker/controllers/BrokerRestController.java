package com.broker.controllers;
import com.broker.domain.*;
import com.broker.domain.Package;
import com.broker.service.TwopcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class BrokerRestController{

    private final PackageRepository packagerepo;
    private final AccommodationRepository accomodationRepo;
    private final TicketRepository ticketRepo;

    private final TransactionRepository transactionRepository;
    @Autowired
    private TwopcService twopcService;

    @Autowired
    public BrokerRestController(PackageRepository packagerepo, AccommodationRepository accomodationRepo, TicketRepository ticketRepo, TransactionRepository transactionRepository) {
        this.packagerepo = packagerepo;
        this.accomodationRepo = accomodationRepo;
        this.ticketRepo = ticketRepo;

        this.transactionRepository = transactionRepository;
    }
    @GetMapping("/")
    CollectionModel<EntityModel<Package>> getPackages() throws Exception {
        Collection<Package> packages = packagerepo.findAll();

        List<EntityModel<Package>> packageEntityModels = new ArrayList<>();
        for (Package m : packages) {
            EntityModel<Package> em = packageToEntityModel(m.getId(), m);
            packageEntityModels.add(em);
        }
        return CollectionModel.of(packageEntityModels,
                linkTo(methodOn(BrokerRestController.class).getPackages()).withSelfRel());
    }

    @GetMapping("/{id}")
    public EntityModel<Package> getPackageById(@PathVariable Integer id) throws Exception {
        Package  pack = packagerepo.findById(id).orElseThrow(()->new Exception("Package with id "+id+" not found"));

        return packageToEntityModel(id, pack);
    }
    @GetMapping("/tickets")
    CollectionModel<EntityModel<Ticket>> getTickets() throws Exception {

        Collection<Ticket> tickets = ticketRepo.findAll();

        List<EntityModel<Ticket>> ticketEntityModels = new ArrayList<>();
        for (Ticket m : tickets) {
            EntityModel<Ticket> em = ticketToEntityModel(m.getId(), m);
            ticketEntityModels.add(em);
        }
        return CollectionModel.of(ticketEntityModels,
                linkTo(methodOn(BrokerRestController.class).getTickets()).withSelfRel());
    }

    @GetMapping("/tickets/i/{id}")
    public EntityModel<Ticket> getTicketById(@PathVariable int id) throws Exception {

        Ticket  pack = ticketRepo.findById(id).orElseThrow(()->new Exception("Ticket with id "+id+" not found"));

        return ticketToEntityModel(id, pack);
    }

    @GetMapping("/tickets/{title}")
    public CollectionModel<EntityModel<Ticket>> getTicketByTitle(@PathVariable String title) throws Exception {
        Collection<Ticket> tickets = ticketRepo.findByTitle(title);

        List<EntityModel<Ticket>> ticketEntityModels = new ArrayList<>();
        for (Ticket m : tickets) {
            EntityModel<Ticket> em = ticketToEntityModel(m.getId(), m);
            ticketEntityModels.add(em);
        }
        return CollectionModel.of(ticketEntityModels,
                linkTo(methodOn(BrokerRestController.class).getTickets()).withSelfRel());

    }

    @GetMapping("/tickets/{date}/accoms")
    CollectionModel<EntityModel<Accommodation>> getAccomsByDate(@PathVariable @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) throws Exception {

        LocalDateTime start = date.toLocalDate().atStartOfDay();
        LocalDateTime end = date.toLocalDate().plusDays(1).atStartOfDay().minusNanos(1);
        Collection<Accommodation> accoms = accomodationRepo.findByDateInBetween(start, end);

        List<EntityModel<Accommodation>> accomEntityModels = new ArrayList<>();
        for (Accommodation m : accoms) {
            EntityModel<Accommodation> em = accomToEntityModel(m.getId(), m);
            accomEntityModels.add(em);
        }
        return CollectionModel.of(accomEntityModels);
    }


    @GetMapping("/accoms/{id}")
    public EntityModel<Accommodation> getAccomById(@PathVariable int id) throws Exception {

        Accommodation a = accomodationRepo.findById(id).orElseThrow(()->new Exception("Accomodation with id "+id+" not found"));

        return accomToEntityModel(id, a);
    }

    @PostMapping("/get/package")
    public ResponseEntity<String> getPackage(@RequestBody Order order){
        //System.out.println("Order id : "+ order.getId()+"\nTicket Id :"+order.getTicket_id()+"\nAccom Id: "+order.getAccom_id()+"\nAddress: "+order.getAddress()+"\nPackage Id: "+order.getPackage_id()+"\nAmount: "+order.getAmount()+"\n OrderTime : "+order.getOrder_time());
        if(order != null){
            Transaction t = new Transaction();
            t.setOrderId(order.getId());
            t.setLastUpdated(LocalDateTime.now());
            t.setAccom_id(order.getAccom_id());
            t.setAddress(order.getAddress());
            t.setOrder_time(order.getOrder_time());
            t.setPackage_id(order.getPackage_id());
            t.setPaid(order.isPaid());
            t.setTicket_id(order.getTicket_id());
            t.setStatus("RECEIVED");
            t.setLastUpdated(LocalDateTime.now());
            transactionRepository.save(t);
            if (twopcService.callPreparePhase(order)){
                Transaction t3 = transactionRepository.findByOrderId(order.getId()).get();
                 t3.setStatus("PREPARED");
                 t3.setLastUpdated(LocalDateTime.now());
                 transactionRepository.save(t3);
                System.out.println("Order prepared");
                if (twopcService.callCommitPhase(order)) { // all parties committed succesfully
                    Transaction t2 = transactionRepository.findByOrderId(order.getId()).get();
                    t2.setStatus("COMMITTED");
                    t2.setLastUpdated(LocalDateTime.now());
                    transactionRepository.save(t2);
                    System.out.println("Order committed");
                    return new ResponseEntity<>("Order is succesful!", HttpStatus.OK);
                }
                Transaction t5 = transactionRepository.findByOrderId(order.getId()).get();
                t5.setStatus("ABORTED");
                t5.setLastUpdated(LocalDateTime.now());
                transactionRepository.save(t5);
                twopcService.callRollback(order);
                return new ResponseEntity<>("Order failed, please try again later.", HttpStatus.OK);
            }
            Transaction t4 = transactionRepository.findByOrderId(order.getId()).get();
            t4.setStatus("ABORTED");
            t4.setLastUpdated(LocalDateTime.now());
            transactionRepository.save(t4);
            twopcService.callRollback(order);
            return new ResponseEntity<>("Order is no longer available, please choose another package.", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/orders")
    List<Transaction> getOrders() throws Exception {
        return transactionRepository.findAll();
    }

    private EntityModel<Package> packageToEntityModel(Integer id, Package pack ) throws Exception {
        return EntityModel.of(pack,
                linkTo(methodOn(BrokerRestController.class).getPackageById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getAccomById(pack.getAccommodation())).withRel("/accoms"),
                linkTo(methodOn(BrokerRestController.class).getTicketById(pack.getTicket())).withRel("/tickets"),
                linkTo(methodOn(BrokerRestController.class).getPackages()).withRel("/packs"));

    }
    private EntityModel<Accommodation> accomToEntityModel(int id, Accommodation accom ) throws Exception {
        return EntityModel.of(accom,
                linkTo(methodOn(BrokerRestController.class).getAccomById(id)).withSelfRel());
    }

    private EntityModel<Ticket> ticketToEntityModel(int id, Ticket ticket ) throws Exception {
        return EntityModel.of(ticket,
                linkTo(methodOn(BrokerRestController.class).getTicketById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getAccomsByDate(ticket.getDate())).withRel("/accoms"),
                linkTo(methodOn(BrokerRestController.class).getTickets()).withRel("/"));

    }

}