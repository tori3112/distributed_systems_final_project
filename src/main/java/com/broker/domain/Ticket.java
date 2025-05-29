package com.broker.domain;

import javax.persistence.*;
import java.sql.Blob;

import java.util.Date;
import java.util.Objects;
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String artist;
    private Date date;
    private String venue;
    @Lob
    private byte[] image;
    // needs more fields for the price and the type of ticket

    public int getId() {
        return id;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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




