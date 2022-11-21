package data.controller.pay;

import data.domain.movie.Movie;
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

    /* 상영중인 영화 리스트 */
    @GetMapping("/screening_list")
    public ResponseEntity<List<Movie>> screeningMovieList(){

        List<Movie> screeningMovies = bookingService.selectScreeningMovieList();

        return new ResponseEntity<>(screeningMovies,HttpStatus.OK);
    }

    /* 상영시간 고유키에 해당하는 예매된 자석리스트 조회*/
    @GetMapping("/reserved_seat")
    public ResponseEntity<?> reservedSeatList(@RequestParam int screentime){

        String reserved_seat = bookingService.reservedSeatList(screentime); ;
        try {
            List<String> list = Arrays.asList(reserved_seat.split(","));
            list.sort(Comparator.naturalOrder());

            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (NullPointerException e){
            e.printStackTrace();
            return new ResponseEntity<>("요청한 상영시간이 존재하지 않습니다.",HttpStatus.BAD_REQUEST);
        }
    }
}