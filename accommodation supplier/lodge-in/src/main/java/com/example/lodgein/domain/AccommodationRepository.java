package com.example.lodgein.domain;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Integer> {

    //@Query("SELECT a FROM Accommodation a WHERE NOT (a.dateOut <= :startDate OR a.dateIn >= :endDate)")
    @Query("SELECT a FROM Accommodation a WHERE a.availability = TRUE")
    public List<Accommodation>findAvailable();
    public List<Accommodation>findByLocation(String location);

}
