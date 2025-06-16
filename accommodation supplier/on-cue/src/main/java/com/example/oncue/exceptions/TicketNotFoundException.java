package com.example.oncue.exceptions;

public class TicketNotFoundException extends RuntimeException {

    public TicketNotFoundException(Integer ticketId) { super("Ticket with ID " + Integer.toString(ticketId) + " not found");
    }
}
