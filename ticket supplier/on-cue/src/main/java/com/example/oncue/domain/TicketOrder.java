package com.example.oncue.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "ticket_order")

public class TicketOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "ticket_id")
    protected Integer ticketId;

    @Column(name = "order_id")
    protected Integer orderId;

    @Column(name = "preparation_status")
    protected String preparationStatus;

    @Column(name = "quantity")
    protected Integer quantity;

}
