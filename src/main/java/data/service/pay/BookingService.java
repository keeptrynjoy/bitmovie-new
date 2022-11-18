package data.service.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    public final BookingRepository bookingRepositorys;

    public void insertBookingData(Booking booking){
        bookingRepositorys.insertBookingData(booking);
    }

    public List<Movie> selectScreeningMovieList(){
        return bookingRepositorys.selectScreeningMovieList();
    }
}
