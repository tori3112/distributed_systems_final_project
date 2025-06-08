package com.broker.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionLogRepository extends JpaRepository<TransactionLog,Integer> {
    List<TransactionLog> findByStatus(String status);
}
