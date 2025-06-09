package com.example.oncue.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Objects;
import java.util.Optional;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity

@Table(name= "Ticket")


public class Ticket {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String artist;
    // TODO: change to LocalDateTime when using Database
    private LocalDateTime date;
    private String venue;
    private String location;



    private float price;
    private int stock;
    //change this to appropriate data type later
    private String image;

    @Column(name = "ticket_type")
    private String ticketType;

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getStock() {return stock;}

    public String getVenue() {
        return venue;
    }

    public String getLocation() {
        return location;
    }

    public float getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public String getType() {return ticketType;}

    public void setType(String type) {this.ticketType = type;}

    public void setPrice(float price) {this.price = price;}

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStock(int stock) {this.stock = stock;}

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setImage( String image) {
        this.image = image;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
