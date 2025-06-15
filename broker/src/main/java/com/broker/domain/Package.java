package com.broker.domain;

import javax.persistence.*;
import java.util.Objects;


@Entity
@Table(name= "concertPackages")
public class Package {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer ticket;
    private Integer accommodation;
    private int availability;
    private float price;

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTicket() {
        return ticket;
    }

    public void setTicket(Integer ticket) {
        this.ticket = ticket;
    }

    public Integer getAccommodation() {
        return accommodation;
    }

    public void setAccommodation(Integer accomodation) {
        this.accommodation = accomodation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int stock) {
        this.availability = stock;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Package aPackage = (Package) o;
        return availability == aPackage.availability && Float.compare(price, aPackage.price) == 0 && Objects.equals(id, aPackage.id) && Objects.equals(ticket, aPackage.ticket) && Objects.equals(accommodation, aPackage.accommodation) && Objects.equals(name, aPackage.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ticket, accommodation, name, availability, price);
    }
}