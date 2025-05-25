package com.broker.domain;

import java.util.ArrayList;
import java.util.Objects;

public class Accomodation {
    protected int id;
    protected String address;
    protected String imageSrc;
    protected String imageAlt;
    protected float price;
    protected String Location;
    protected int reviewCount;
    protected float rating;
    protected ArrayList<String> offer;

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

    public ArrayList<String> getOffer() {
        return offer;
    }

    public void setOffer(ArrayList<String> offer) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
