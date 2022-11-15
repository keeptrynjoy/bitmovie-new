package data.controller.pay;

import data.domain.pay.Booking;
import data.service.pay.BookingService;
import data.service.user.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping ("/complete")
    public ResponseEntity<?> insertBooking(@RequestBody Booking booking){

        //insert implement
        bookingService.insertBookingData(booking);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
