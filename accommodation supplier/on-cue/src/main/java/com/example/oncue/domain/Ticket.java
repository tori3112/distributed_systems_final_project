package com.example.oncue.domain;

import java.util.Objects;
import java.util.Optional;
import java.time.LocalDateTime;


public class Ticket {

    protected Integer id;
    protected String title;
    protected String artist;
    // TODO: change to LocalDateTime when using Database
    protected String date;
    protected String venue;
    protected String location;
    protected Integer price;
    //change this to appropriate data type later
    protected String image;

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getVenue() {
        return venue;
    }

    public String getLocation() {
        return location;
    }

    public Integer getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
