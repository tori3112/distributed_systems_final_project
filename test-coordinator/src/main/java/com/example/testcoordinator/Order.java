package com.example.testcoordinator;

import java.util.Date;

public class Order {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPackage_id() {
        return package_id;
    }

    public void setPackage_id(Integer package_id) {
        this.package_id = package_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public Date getOrder_time() {
        return order_time;
    }

    public void setOrder_time(Date order_time) {
        this.order_time = order_time;
    }

    public Integer getAccom_id() {
        return accom_id;
    }

    public void setAccom_id(Integer accom_id) {
        this.accom_id = accom_id;
    }

    public Integer getTicket_id() {
        return ticket_id;
    }

    public void setTicket_id(Integer ticket_id) {
        this.ticket_id = ticket_id;
    }

    private Integer id;
    private Integer package_id;
    private String address;
    private boolean paid;
    private Date order_time;
    private Integer accom_id;
    private Integer ticket_id;
}
