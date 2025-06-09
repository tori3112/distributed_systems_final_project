package com.example.lodgein.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="AccommOrder")
public class AccommOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    protected Integer accommId;
    protected Integer orderId;
    protected String preparationStatus;
//    @Column(name = "timestamp", insertable = false, updatable = false)
//    protected LocalDateTime timestamp;
}
