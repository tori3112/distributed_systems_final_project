package com.broker.domain;

import java.util.Objects;

public class Package {
    protected String id;
    protected String artistId;
    protected String accomodId;
    protected String name;
    protected int stock;
    protected float price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getArtistId() {
        return artistId;
    }

    public void setArtistId(String artistId) {
        this.artistId = artistId;
    }

    public String getAccomodId() {
        return accomodId;
    }

    public void setAccomodId(String accomodId) {
        this.accomodId = accomodId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
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
        return stock == aPackage.stock && Float.compare(price, aPackage.price) == 0 && Objects.equals(id, aPackage.id) && Objects.equals(artistId, aPackage.artistId) && Objects.equals(accomodId, aPackage.accomodId) && Objects.equals(name, aPackage.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, artistId, accomodId, name, stock, price);
    }
}