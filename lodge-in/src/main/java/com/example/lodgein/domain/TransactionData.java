package com.example.lodgein.domain;

//change to .sql if it doesn't work
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransactionData {

    private Integer id;
    private Integer package_id;
    private String address;
    private boolean paid;
    private Date order_time;
    private Integer accom_id;
    private Integer ticket_id;
}
