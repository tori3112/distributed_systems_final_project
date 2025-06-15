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
    private String location;
    private String image;
    private float price;
    @Column(name = "ticket_type")
    private String ticketType;
    private Integer stock;

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

    public String getTicketType() {return ticketType;}

    public void setTicketType(String ticketType) {this.ticketType = ticketType;}

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

    public String getLocation() {return location;}

    public void setLocation(String location) {this.location = location;}
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




