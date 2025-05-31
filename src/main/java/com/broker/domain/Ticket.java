package com.broker.domain;

import javax.persistence.*;
import java.sql.Blob;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;
@Entity
@Table(name="Ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String artist;
    private LocalDateTime date;
    private String venue;
    private String image;
    private float price;
    private String ticket_type;
    private Integer stock;
    // needs more fields for the price and the type of ticket

    public int getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getTicket_type() {
        return ticket_type;
    }

    public void setTicket_type(String ticket_type) {
        this.ticket_type = ticket_type;
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

    public LocalDateTime getDate() {return date;}

    public void setDate(LocalDateTime date) {this.date = date;}

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getImage() {
        return image;
    }

    public Integer getStock() {return stock;}

    public void setStock(Integer stock) {this.stock = stock;}

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




