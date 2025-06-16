package com.example.lodgein.exceptions;

public class NoAccommException extends RuntimeException {
    public NoAccommException(String location) {
        super("Sorry, all the accommodations at " + location + " are fully booked!");
    }

}
