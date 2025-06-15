package com.broker.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    List<Transaction> findByStatus(String status);
    Optional<Transaction> findByOrderId(Integer orderId);
}
