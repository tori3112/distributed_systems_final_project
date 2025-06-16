package com.example.lodgein.exceptions;

public class BookedAccommException extends RuntimeException {
    public BookedAccommException() {
        super("This accommodation is not available!");
    }
}
