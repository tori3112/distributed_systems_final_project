package com.example.oncue.domain;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class TicketRepository {

    private static final Map<String, Ticket> tickets = new HashMap<>();

    @PostConstruct
    public void initData() {

        //TODO: later change code to link with database

        //examples
        Ticket t = new Ticket();
        t.setId(1);
        t.setName("Ticket 1");
        t.setType(TicketType.GENERAL);
        t.setAddress("123 Main St");
        t.setLocation("Denver, CO");
        t.setSeat(Optional.of("A1"));
        t.setPrice(100);
        t.setPicture("http://www.example.com/image1.jpg");
        tickets.put(t.getId().toString(), t);

        Ticket s = new Ticket();
        s.setId(1);
        s.setName("Ticket 1");
        s.setType(TicketType.GENERAL);
        s.setAddress("123 Main St");
        s.setLocation("Denver, CO");
        s.setSeat(Optional.of("A1"));
        s.setPrice(100);
        s.setPicture("http://www.example.com/image1.jpg");
        tickets.put(t.getId().toString(), s);
    }

    public Optional<Ticket> findTicket(String id ){
        Assert.notNull(id, "The ticket id must not be null");
        Ticket ticket = tickets.get(id);
        return Optional.ofNullable(ticket);
    }

    public Collection<Ticket> getAllTickets(){return tickets.values();}





}
