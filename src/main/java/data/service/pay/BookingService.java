package data.service.pay;

import data.domain.pay.Booking;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {

    public final BookingRepository bookingRepositorys;

    public void insertBookingData(Booking booking){
        bookingRepositorys.insertBookingData(booking);
    }
}
