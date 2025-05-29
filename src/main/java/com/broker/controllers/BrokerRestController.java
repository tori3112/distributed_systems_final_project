package com.broker.controllers;
import com.broker.domain.*;
import com.broker.domain.Package;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
public class BrokerRestController{

    private final PackageRepository packagerepo;
    private final AccomodationRepository accomodationRepo;
    private final TicketRepository ticketRepo;

    @Autowired
    public BrokerRestController(PackageRepository packagerepo, AccomodationRepository accomodationRepo, TicketRepository ticketRepo) {
        this.packagerepo = packagerepo;
        this.accomodationRepo = accomodationRepo;
        this.ticketRepo = ticketRepo;
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

    @GetMapping("/tickets/{id}")
    public EntityModel<Ticket> getTicketById(@PathVariable int id) throws Exception {
        Ticket  pack = ticketRepo.findById(id).orElseThrow(()->new Exception("Ticket with id "+id+" not found"));

        return ticketToEntityModel(id, pack);
    }

    @GetMapping("/accoms")
    CollectionModel<EntityModel<Accomodation>> getAccoms() throws Exception {
        Collection<Accomodation> accoms = accomodationRepo.findAll();

        List<EntityModel<Accomodation>> accomEntityModels = new ArrayList<>();
        for (Accomodation m : accoms) {
            EntityModel<Accomodation> em = accomToEntityModel(m.getId(), m);
            accomEntityModels.add(em);
        }
        return CollectionModel.of(accomEntityModels,
                linkTo(methodOn(BrokerRestController.class).getAccoms()).withSelfRel());
    }

    @GetMapping("/accoms/{id}")
    public EntityModel<Accomodation> getAccomById(@PathVariable int id) throws Exception {
        Accomodation a = accomodationRepo.findById(id).orElseThrow(()->new Exception("Accomodation with id "+id+" not found"));

        return accomToEntityModel(id, a);
    }

    private EntityModel<Package> packageToEntityModel(Integer id, Package pack ) throws Exception {
        return EntityModel.of(pack,
                linkTo(methodOn(BrokerRestController.class).getPackageById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getAccomById(pack.getAccommodation())).withRel("/accoms"),
                linkTo(methodOn(BrokerRestController.class).getTicketById(pack.getTicket())).withRel("/tickets"),
                linkTo(methodOn(BrokerRestController.class).getPackages()).withRel("/packs"));

    }
    private EntityModel<Accomodation> accomToEntityModel(int id, Accomodation accom ) throws Exception {
        return EntityModel.of(accom,
                linkTo(methodOn(BrokerRestController.class).getAccomById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getAccoms()).withRel("/"));
    }

    private EntityModel<Ticket> ticketToEntityModel(int id, Ticket ticket ) throws Exception {
        return EntityModel.of(ticket,
                linkTo(methodOn(BrokerRestController.class).getTicketById(id)).withSelfRel(),
                linkTo(methodOn(BrokerRestController.class).getTickets()).withRel("/"));
    }

}