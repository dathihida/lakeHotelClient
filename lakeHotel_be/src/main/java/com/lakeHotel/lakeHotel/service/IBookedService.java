package com.lakeHotel.lakeHotel.service;

import com.lakeHotel.lakeHotel.model.BookedRoom;

import java.util.List;

public interface IBookedService {
    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();
    List<BookedRoom> getBookingsByUserEmail(String email);
}
