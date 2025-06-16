package com.example.lodgein.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccommNotFoundException.class)
    public ResponseEntity<String> accommNotFoundExceptionHandler(AccommNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoAccommException.class)
    public ResponseEntity<String> noAvailableExceptionHandler(NoAccommException ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookedAccommException.class)
    public ResponseEntity<String> bookedExceptionHandler(NoAccommException ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

}
