package com.broker.domain;

import java.sql.Blob;
import java.util.Objects;

public class Ticket {
    protected int id;
    protected String title;
    protected String artist;
    protected String date;
    protected String venue;
    protected Blob image;
    // needs more fields for the price and the type of ticket

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return Objects.equals(id, ticket.id) && Objects.equals(title, ticket.title) && Objects.equals(artist, ticket.artist) && Objects.equals(date, ticket.date) && Objects.equals(venue, ticket.venue) && Objects.equals(image, ticket.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, artist, date, venue, image);
    }
}




