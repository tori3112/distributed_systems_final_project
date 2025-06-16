package com.example.lodgein;

import com.example.lodgein.domain.Accommodation;
import com.example.lodgein.domain.AccommodationRepository;
import com.example.lodgein.exceptions.AccommNotFoundException;
import com.example.lodgein.exceptions.NoAccommException;
import com.example.lodgein.exceptions.BookedAccommException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
        Accommodation accommodation = accommodationRepository.findAccommodationById(id).orElseThrow(() -> new AccommNotFoundException(id));
//        return ticket.map(EntityModel::of).orElse(null);
        return accommToEntityModel(id, accommodation);
    }

    @GetMapping("/accomms")
    CollectionModel<EntityModel<Accommodation>> getAccommodations() {
        Collection<Accommodation> accommodations = accommodationRepository.findAllAccommodations();

        List<EntityModel<Accommodation>> accommEntityModels = new ArrayList<>();
        for (Accommodation a : accommodations) {
            EntityModel<Accommodation> accomm = accommToEntityModel(a.getId(), a);
            accommEntityModels.add(accomm);
        }
        return CollectionModel.of(accommEntityModels,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodations()).withSelfRel());
    }

    @GetMapping("/accomms/available/{location}/{requestedIn}/{requestedOut}")
    CollectionModel<EntityModel<Accommodation>> getAccommodationsByLocation(@PathVariable String location,
                                                                            @PathVariable String requestedIn,
                                                                            @PathVariable String requestedOut) {
        List<Accommodation> accommodations = accommodationRepository.findAccommodationsByLocation(location);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd yyyy HH:mm");
        LocalDateTime dateIn = LocalDateTime.parse(requestedIn, formatter);
        LocalDateTime dateOut = LocalDateTime.parse(requestedOut, formatter);

        List<EntityModel<Accommodation>> accommCollectionModel = new ArrayList<>();
        if (accommodations.isEmpty()){
            throw new NoAccommException(location);
        }

        accommodations.removeIf(a -> !accommodationRepository.isAvailable(a, dateIn, dateOut));

        for (Accommodation a : accommodations) {
            EntityModel<Accommodation> accom = accommToEntityModel(a.getId(), a, requestedIn, requestedOut);
            accommCollectionModel.add(accom);
        }

        if (accommCollectionModel.isEmpty()){
            System.out.println("No accommodations available for the requested date range.");
        }

        return CollectionModel.of(accommCollectionModel,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodationsByLocation(location, requestedIn, requestedOut)).withSelfRel());
    }


    //Make to entity methods
    private EntityModel<Accommodation> accommToEntityModel(Integer id, Accommodation accomm) {
        return EntityModel.of(accomm,
                linkTo(methodOn(AccommodationsRestController.class).getAccommodationById(id)).withSelfRel(),
                linkTo(methodOn(AccommodationsRestController.class).getAccommodations()).withRel("/accomms"));
    }

    private EntityModel<Accommodation> accommToEntityModel(Integer id,
                                                           Accommodation accomm,
                                                           String requestedIn,
                                                           String requestedOut) {
        // Reuse the core entity model method
        EntityModel<Accommodation> model = accommToEntityModel(id, accomm);

        // Add the extra link with dates
        model.add(linkTo(methodOn(AccommodationsRestController.class)
                .getAccommodationsByLocation(accomm.getLocation(), requestedIn, requestedOut))
                .withRel("search-by-location"));

        return model;
    }

}
