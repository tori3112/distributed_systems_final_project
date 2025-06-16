package com.example.lodgein.domain;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class AccommodationRepository {

    private static final Map<Integer, Accommodation> accommodations = new HashMap<>();

    @PostConstruct
    public void initData() {

        //TODO: later change code to link with database

        Accommodation a = new Accommodation();
        a.setId(1);
        a.setAddress("Moestraat 44");
        a.setDateIn(LocalDateTime.of(2025, 6, 15, 14, 0));
        a.setDateOut(LocalDateTime.of(2025, 6, 17, 10, 0));
        a.setImageSrc("myStomach");
        a.setImageAlt("sth");
        a.setPrice(78.98f);
        a.setLocation("Antwerp,Belgium");
        a.setReviewCount(100);
        a.setRating(4.5f);
        a.getOffer().add("2 Bedrooms");
        a.getOffer().add("Bathtub");
        a.getOffer().add("WiFi");
        a.getOffer().add("TV-cable");
        a.getOffer().add("Toiletries");
        a.getOffer().add("Garden");
        accommodations.put(a.getId(), a);

        Accommodation b = new Accommodation();
        b.setId(2);
        b.setAddress("Jln Raja Kentut 33");
        b.setDateIn(LocalDateTime.of(2025, 10, 15, 14, 0));
        b.setDateOut(LocalDateTime.of(2025, 11, 17, 10, 0));
        b.setImageSrc("myBrain");
        b.setImageAlt("brein");
        b.setPrice(78.98f);
        b.setLocation("Jakarta,Indonesia");
        b.setReviewCount(1500);
        b.setRating(3.8f);
        b.getOffer().add("4 Bedrooms");
        b.getOffer().add("Bathtub");
        b.getOffer().add("WiFi");
        b.getOffer().add("TV-cable");
        b.getOffer().add("Toiletries");
        b.getOffer().add("Garden");
        b.getOffer().add("Balcony");
        accommodations.put(b.getId(), b);
    }

    public Optional<Accommodation> findAccommodationById(Integer id ){
        Assert.notNull(id, "The accommodation id must not be null");
        Accommodation accommodation = accommodations.get(id);
        return Optional.ofNullable(accommodation);
    }

    public Collection<Accommodation> findAllAccommodations(){return accommodations.values();}

    public List<Accommodation> findAccommodationsByLocation(String location){
        return accommodations.values().stream()
                .filter(a->a.getLocation().toLowerCase().contains(location.toLowerCase()))
                .collect(Collectors.toList());
    }

    public boolean isAvailable(Accommodation a, LocalDateTime requestedIn, LocalDateTime requestedOut){
        return !requestedIn.isBefore(a.getDateIn()) || !requestedOut.isAfter(a.getDateOut());
    }
    
}
