package data.service.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

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

    public String reservedSeatList(int screentime){

        return bookingRepositorys.selectSeatNumData(screentime);
    }
}