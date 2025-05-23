package com.example.oncue.domain;

import java.util.Objects;
import java.util.Optional;


public class Ticket {

    protected Integer id;
    protected String name;
    protected TicketType type;
    protected String address;
    protected String location;
    protected Optional<String> seat;
    protected Integer price;
    //change this to appropriate data type later
    protected String picture;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public TicketType getType() {
        return type;
    }

    public String getAddress() {
        return address;
    }

    public String getLocation() {
        return location;
    }

    public Optional<String> getSeat() {
        return seat;
    }

    public Integer getPrice() {
        return price;
    }

    public String getPicture() {
        return picture;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(TicketType type) {
        this.type = type;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSeat(Optional<String> seat) {
        this.seat = seat;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
