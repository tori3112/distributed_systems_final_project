package com.example.lodgein.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Accommodation")
public class Accommodation {

    //protected Integer id;
    @Column(name = "address")
    protected String address;
    @Column(name = "dateIn")
    protected LocalDateTime dateIn;
    @Column(name = "dateOut")
    protected LocalDateTime dateOut;
    @Column(name = "imageSrc")
    protected String imageSrc;
    @Column(name = "imageAlt")
    protected String imageAlt;
    @Column(name = "price")
    protected float price;
    //change this to appropriate data type later
    @Column(name = "location")
    protected String location;
    @Column(name = "reviewCount")
    protected Integer reviewCount;
    @Column(name = "rating")
    protected float rating;
    @Column(name = "offer")
    @Convert(converter = OfferConverter.class)
    protected List<String> offer = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    @Column(name = "availability")
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
