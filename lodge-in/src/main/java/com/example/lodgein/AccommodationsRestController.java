package com.example.lodgein;

import com.example.lodgein.domain.AccommPreparationStatus;
import com.example.lodgein.domain.Accommodation;
import com.example.lodgein.domain.AccommodationRepository;
import com.example.lodgein.domain.TransactionData;
import com.example.lodgein.exceptions.AccommNotFoundException;
import com.example.lodgein.exceptions.NoAccommException;
import com.example.lodgein.exceptions.BookedAccommException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class AccommodationsRestController {
    private final AccommodationRepository accommodationRepository;

    @Autowired
    AccommodationsRestController(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
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
    public ResponseEntity<String> prepareAccom(@RequestBody TransactionData transactiondata){
        try{
            Optional<Accommodation> acc = accommodationRepository.findById(transactiondata.getAccom_id());

            if(acc == null ){
                throw new AccommNotFoundException(transactiondata.getAccom_id());
            }
            else if(!acc.get().isAvailability()){
                throw new BookedAccommException();
            }
            Accommodation accomm = acc.get();

            accomm.setAccommPreparationStatus(AccommPreparationStatus.PREPARING.name());
            accommodationRepository.save(accomm);

            return ResponseEntity.ok("Order prepared successfully.");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during order preparation.");
        }
    }


}
