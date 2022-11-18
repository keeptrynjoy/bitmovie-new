package data.controller.pay;

import data.domain.movie.Movie;
import data.service.pay.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}