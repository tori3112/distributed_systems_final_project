package com.example.lodgein.exceptions;

public class AccommNotFoundException extends RuntimeException{
    public AccommNotFoundException(Integer id) { super("Accommodation with ID " + Integer.toString(id) + " not found");
    }

}
