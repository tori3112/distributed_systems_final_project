package com.broker.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation,Integer> {
    List<Accommodation> findByDateInBetween(LocalDateTime start, LocalDateTime end);
}


