package data.controller.pay;

import data.domain.movie.JoinMovie;
import data.domain.movie.Movie;
import data.service.movie.MovieService;
import data.service.movie.ScreenTimeService;
import data.service.pay.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    private final ScreenTimeService screenTimeService;

    private final MovieService movieService;

    /* 상영중인 영화 리스트 */
    @GetMapping("/screening_list")
    public ResponseEntity<Object> screeningMovieList(@RequestParam(defaultValue = "m_name") String order_stand,
                                                          @RequestParam(defaultValue = "null") String BorA) {

        List<JoinMovie> joinMovies = movieService.selectMovieList(order_stand, BorA);

        return new ResponseEntity<>(joinMovies,HttpStatus.OK);
    }

    /* 상영시간 고유키에 해당하는 예매된 자석리스트 조회*/
    @GetMapping("/reserved_seat")
    public ResponseEntity<?> reservedSeatList(@RequestParam int screentime){

       boolean search_scrtime =  screenTimeService.selectScrTimeByScrtimePK(screentime);

       if(search_scrtime){
        String reserved_seat = bookingService.reservedSeatList(screentime); ;
        try {
            List<String> list = Arrays.asList(reserved_seat.split(","));
            list.sort(Comparator.naturalOrder());
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (NullPointerException e){
            e.printStackTrace();
            return ResponseEntity.ok("예매된 자석이 없습니다.");
        }
       } else {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청한 상영시간은 존재하지 않습니다.");
       }

    }
}