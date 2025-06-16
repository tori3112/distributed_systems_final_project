package com.example.lodgein;

import com.example.lodgein.domain.*;
import com.example.lodgein.exceptions.AccommNotFoundException;
import com.example.lodgein.exceptions.NoAccommException;
import com.example.lodgein.exceptions.BookedAccommException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class AccommodationsRestController {
    private final AccommodationRepository accommodationRepository;
    private final AccommOrderRepository accommOrderRepository;
    //for debug
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger log = LoggerFactory.getLogger(AccommodationsRestController.class);

    @Autowired
    AccommodationsRestController(AccommodationRepository accommodationRepository, AccommOrderRepository accommOrderRepository) {
        this.accommodationRepository = accommodationRepository;
        this.accommOrderRepository = accommOrderRepository;

    }

    @GetMapping("/accomms/{id}")
    EntityModel<Accommodation> getAccommodationById(@PathVariable Integer id) {
        Accommodation accommodation = accommodationRepository.findById(id).orElseThrow(() -> new AccommNotFoundException(id));
//        return ticket.map(EntityModel::of).orElse(null);
        return accommToEntityModel(id, accommodation);
    }

    @GetMapping("/accomms")
    CollectionModel<EntityModel<Accommodation>> getAccommodations() {
        Collection<Accommodation> accommodations = accommodationRepository.findAll();

        List<EntityModel<Accommodation>> accommEntityModels = new ArrayList<>();
        for (Accommodation a : accommodations) {
            EntityModel<Accommodation> accomm = accommToEntityModel(a.getId(), a);
            accommEntityModels.add(accomm);
        }
        return CollectionModel.of(accommEntityModels,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodations()).withSelfRel());
    }

    @GetMapping("/accomms/available/{location}")
    CollectionModel<EntityModel<Accommodation>> getAccommodationsByLocation(@PathVariable String location) {
        List<Accommodation> byLocation = accommodationRepository.findByLocation(location);

//
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd yyyy HH:mm");
//        LocalDateTime dateIn = LocalDateTime.parse(requestedIn, formatter);
//        LocalDateTime dateOut = LocalDateTime.parse(requestedOut, formatter);

        List<Accommodation> byAvailability = accommodationRepository.findAvailable();


        List<EntityModel<Accommodation>> accommCollectionModel = new ArrayList<>();
        if (byLocation.isEmpty() ||  byAvailability.isEmpty()){
            throw new NoAccommException(location);
        }
        List<Accommodation> accommodations = new ArrayList<>(byAvailability);
        accommodations.retainAll(byLocation);

        // accommodations.removeIf(a -> !accommodationRepository.isAvailable(a, dateIn, dateOut));
        for (Accommodation a : accommodations) {
            EntityModel<Accommodation> accom = accommToEntityModel(a.getId(), a);
            accommCollectionModel.add(accom);
        }

        if (accommCollectionModel.isEmpty()){
            System.out.println("No accommodations available for the requested date range.");
        }

        return CollectionModel.of(accommCollectionModel,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodationsByLocation(location)).withSelfRel());
    }


    //Make to entity methods
    private EntityModel<Accommodation> accommToEntityModel(Integer id, Accommodation accomm) {
        return EntityModel.of(accomm,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodationById(id)).withSelfRel(),
                linkTo(methodOn(AccommodationsRestController.class).getAccommodations()).withRel("/accomms"),
                linkTo(methodOn(AccommodationsRestController.class)
                        .getAccommodationsByLocation(accomm.getLocation()))
                        .withRel("search-by-location"));
    }

    //For two-phase commit

    @PostMapping("/prepare_accomm")
    public ResponseEntity<String> prepareAccom(@RequestBody Order order){
        log.info("let's prepare");
        AccommOrder accOrder = new AccommOrder();
        log.info("accOrder created here");
        try{
            log.info("let's set it up");
            accOrder.setAccommId(order.getAccom_id());
            log.info("let's order_id");
            accOrder.setOrderId(order.getId());

            log.info("got here");
            ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(order);
                log.info("Received Order JSON: {}", json);
            } catch (Exception e) {
                log.error("Failed to serialize Order object", e);
            }

            if(accommOrderRepository.countActivePrepares(order.getAccom_id())>0){
                throw new BookedAccommException();
            }

            Optional<Accommodation> acc = accommodationRepository.findById(order.getAccom_id());

            log.info("now I here");

            if(acc.isEmpty() ){

                throw new AccommNotFoundException(order.getAccom_id());
            }
            Accommodation accomm = acc.get();
            entityManager.detach(accomm);


            if(!accomm.isAvailability()){
                throw new BookedAccommException();
            }
            log.info("finally here");



            accOrder.setPreparationStatus(AccommPreparationStatus.PREPARING.name());
            //TODO: Debug, remove later
            //ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(accOrder);
                log.info("Received Order JSON: {}", json);
            } catch (Exception e) {
                log.error("Failed to serialize Order object", e);
            }
            accommOrderRepository.save(accOrder);

            log.info("Order prepared success");
            return ResponseEntity.ok("Order prepared successfully.");
        }
        catch (Exception e){
            accOrder.setPreparationStatus(AccommPreparationStatus.NOT_PREPARED.name());
            accommOrderRepository.save(accOrder);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during order preparation.");
        }
    }

    @PostMapping("/commit_accomm")
    public ResponseEntity<String> commitAccom(@RequestBody Order order){
        Optional<AccommOrder> a = accommOrderRepository.findByOrderId(order.getId());

        Optional<Accommodation> acc = accommodationRepository.findById(order.getAccom_id());


        if(acc.isEmpty() && a.isEmpty()){
            throw new AccommNotFoundException(order.getAccom_id());
        }

        Accommodation accomm = acc.get();
        AccommOrder accOrder = a.get();

        if (accOrder != null && accOrder.getPreparationStatus().equalsIgnoreCase(AccommPreparationStatus.PREPARING.name())){
            accomm.setAvailability(false);
            accOrder.setPreparationStatus(AccommPreparationStatus.COMMIT.name());
            //TODO: Debug, remove later
            ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(accOrder);
                log.info("Received Order JSON: {}", json);
            } catch (Exception e) {
                log.error("Failed to serialize Order object", e);
            }
            accommOrderRepository.save(accOrder);
            accommodationRepository.save(accomm);

            return ResponseEntity.ok("Accommodation committed successfully.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Order cannot committed");
    }

    @PostMapping("/rollback_accomm")
    public ResponseEntity<String> rollbackAccom(@RequestBody Order order){
        Optional<AccommOrder> a = accommOrderRepository.findByOrderId(order.getId());

        Optional<Accommodation> acc = accommodationRepository.findById(order.getAccom_id());


        if(acc.isEmpty() && a.isEmpty()){
            throw new AccommNotFoundException(order.getAccom_id());
        }

        AccommOrder accOrder = a.get();
        Accommodation accomm = acc.get();

        if (accOrder != null){
            accomm.setAvailability(true);
            accOrder.setPreparationStatus(AccommPreparationStatus.ROLLBACK.name());
            //TODO: Debug, remove later
            ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(accOrder);
                log.info("Received Order JSON: {}", json);
            } catch (Exception e) {
                log.error("Failed to serialize Order object", e);
            }
            accommOrderRepository.save(accOrder);
            accommodationRepository.save(accomm);

            return ResponseEntity.ok("Accommodation rolled back successfully.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during rollback");
    }

}
