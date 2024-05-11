package com.lakeHotel.lakeHotel.service;

import com.lakeHotel.lakeHotel.exception.InvalidBookingRequestException;
import com.lakeHotel.lakeHotel.exception.ResourceNotFoundException;
import com.lakeHotel.lakeHotel.model.BookedRoom;
import com.lakeHotel.lakeHotel.model.Room;
import com.lakeHotel.lakeHotel.repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedService{

    private final BookedRoomRepository bookedRoomRepository;
    private final IRoomService roomService;

    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookedRoomRepository.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookedRoomRepository.save(bookingRequest);
        }else{
            throw new
                    InvalidBookingRequestException("Sorry, This room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                            || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                            || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                            && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                            ||(bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                            && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                            ||(bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                            && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                            ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                            ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate())));
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookedRoomRepository.deleteById(bookingId);

    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookedRoomRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("No booking found with booking code: " + confirmationCode));
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookedRoomRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookedRoomRepository.findByGuestEmail(email);
    }
}
