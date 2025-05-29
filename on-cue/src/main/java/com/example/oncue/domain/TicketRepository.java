package com.example.oncue.domain;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class TicketRepository {

    private static final Map<Integer, Ticket> tickets = new HashMap<>();

    @PostConstruct
    public void initData() {

        //TODO: later change code to link with database

        Ticket t = new Ticket();
        t.setId(1);
        t.setTitle("Bewitched Tour");
        t.setArtist("Laufey");
        t.setDate("Nov 16");
        t.setVenue("La Madeleine");
        t.setLocation("Brussels, Belgium");
        t.setImage("https://shorturl.at/7fHAv");
        tickets.put(t.getId(), t);

        Ticket s = new Ticket();
        s.setId(2);
        s.setTitle("Eras Tour");
        s.setArtist("Taylor Swift");
        s.setDate("May 5");
        s.setVenue("National Stadium");
        s.setLocation("Singapore");
        s.setImage("https://shorturl.at/7fHAv");
        tickets.put(s.getId(), s);

        //examples
        /*Ticket t = new Ticket();
        t.setId(1);
        t.setName("Ticket 1");
        t.setType(TicketType.GENERAL);
        t.setAddress("123 Main St");
        t.setLocation("Denver, CO");
        t.setSeat(Optional.of("A1"));
        t.setPrice(100);
        t.setPicture("http://www.example.com/image1.jpg");
        tickets.put(t.getId(), t);

        Ticket s = new Ticket();
        s.setId(2);
        s.setName("Ticket 2");
        s.setType(TicketType.VIP);
        s.setAddress("123 Town Hall");
        s.setLocation("Wembley, England");
        s.setSeat(Optional.of("B2"));
        s.setPrice(150);
        s.setPicture("http://www.example.com/image1.jpg");
        tickets.put(s.getId(), s);*/
    }

    public Optional<Ticket> findTicketById(Integer id ){
        Assert.notNull(id, "The ticket id must not be null");
        Ticket ticket = tickets.get(id);
        return Optional.ofNullable(ticket);
    }

    public Collection<Ticket> findAllTickets(){return tickets.values();}

    public List<Ticket> findTicketsByTitle(String title){
        return tickets.values().stream()
                .filter(t->t.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }


}
