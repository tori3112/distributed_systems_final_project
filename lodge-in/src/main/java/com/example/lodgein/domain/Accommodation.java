package com.example.lodgein.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Accommodation")
public class Accommodation {

    //protected Integer id;
    protected String address;
    protected LocalDateTime dateIn;
    protected LocalDateTime dateOut;
    protected String imageSrc;
    protected String imageAlt;
    protected float price;
    //change this to appropriate data type later
    protected String location;
    protected Integer reviewCount;
    protected float rating;
    @Convert(converter = OfferConverter.class)
    protected List<String> offer = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    protected boolean availability;
//
//    public String getPreparationStatus() {
//        return preparationStatus;
//    }
//
//    public void setPreparationStatus(String accommPreparationStatus) {
//        this.preparationStatus = accommPreparationStatus;
//    }
//
//    //TODO: reminder to put this in DB
//    protected String preparationStatus;

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean booked) {
        this.availability = booked;
    }

    /*public Integer getId() {
        return id;
    }*/

    /*public void setId(Integer id) {
        this.id = id;
    }*/

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getDateIn() {
        return dateIn;
    }

    public void setDateIn(LocalDateTime dateIn) {
        this.dateIn = dateIn;
    }

    public LocalDateTime getDateOut() {
        return dateOut;
    }

    public void setDateOut(LocalDateTime dateOut) {
        this.dateOut = dateOut;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public List<String> getOffer() {
        return offer;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
