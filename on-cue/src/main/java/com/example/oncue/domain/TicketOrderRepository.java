package com.example.oncue.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TicketOrderRepository extends JpaRepository<TicketOrder, Integer> {

    @Query("SELECT COALESCE(SUM(t.quantity), 0) FROM TicketOrder t " +
            "WHERE t.preparationStatus = 'PREPARING' AND t.ticketId = :ticketId")
    Integer totalQuantityBeingPrepared(@Param("ticketId") Integer ticketId);

    @Query("SELECT t FROM TicketOrder t WHERE t.preparationStatus = 'PREPARING' AND t.ticketId = :ticketId")
    TicketOrder findByTicketIdPrepare(@Param("ticketId") Integer ticketId);

    // 找到处于 COMMIT 状态的订单
    @Query("SELECT t FROM TicketOrder t WHERE t.preparationStatus = 'COMMIT' AND t.ticketId = :ticketId")
    TicketOrder findByTicketIdCommit(@Param("ticketId") Integer ticketId);

    TicketOrder findByTicketId(Integer ticketId);

    Optional<TicketOrder> findByOrderId(Integer orderId);
}

