package data.service.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookingService {

    public final BookingRepository bookingRepositorys;

    public void insertBookingData(Booking booking){
        bookingRepositorys.insertBookingData(booking);
    }

    public List<Movie> selectScreeningMovieList(){

        List<Movie> selectMovieList = bookingRepositorys.selectScreeningMovieList();

        for (Movie m : selectMovieList){
            String[] split = m.getM_photo().split(",", 2);
//            System.out.println(split[0]);
            m.setM_photo(split[0]);
        }

        return selectMovieList;
    }

    public boolean bookingCheck(Booking booking){
        String book_seat_num = booking.getBook_seat_num();
        int scrtime_pk = booking.getScrtime_pk();



        return true;

    }
}
