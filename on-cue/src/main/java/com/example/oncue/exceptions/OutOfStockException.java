package com.example.oncue.exceptions;

public class OutOfStockException extends RuntimeException{

    public OutOfStockException(String title) {
        super("Tickets for  " + title + " is out of stock");
    }

}
