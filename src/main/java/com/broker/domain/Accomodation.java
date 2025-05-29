package com.broker.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Accomodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date dateIn;
    private Date dateOut;
    private String address;
    private String imageSrc;
    private String imageAlt;
    private float price;
    private String Location;
    private int reviewCount;
    private float rating;
    @ElementCollection
    private List<String> offer;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Accomodation that = (Accomodation) o;
        return Float.compare(price, that.price) == 0 && reviewCount == that.reviewCount && Float.compare(rating, that.rating) == 0 && Objects.equals(id, that.id) && Objects.equals(address, that.address) && Objects.equals(imageSrc, that.imageSrc) && Objects.equals(imageAlt, that.imageAlt) && Objects.equals(Location, that.Location) && Objects.equals(offer, that.offer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, address, imageSrc, imageAlt, price, Location, reviewCount, rating, offer);
    }

    public List<String> getOffer() {
        return offer;
    }

    public void setOffer(List<String> offer) {
        this.offer = offer;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public Date getDateIn() {
        return dateIn;
    }

    public void setDateIn(Date dateIn) {
        this.dateIn = dateIn;
    }

    public Date getDateOut() {
        return dateOut;
    }

    public void setDateOut(Date dateOut) {
        this.dateOut = dateOut;
    }
}
