package com.lakeHotel.lakeHotel.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super((message));
    }
}
