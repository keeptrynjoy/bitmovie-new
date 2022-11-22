package data.repository.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BookingRepository {

    public void insertBookingData(Booking booking);

    public List<Movie> selectScreeningMovieList();

    public String selectSeatNumData(int screentime);
}
