package data.controller.movie;

import data.domain.movie.Movie;
import data.service.movie.MovieService;
import data.service.movie.PersonService;
import data.service.movie.ScreenTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final PersonService personService;
    private final ScreenTimeService screenTimeService;


    //    @GetMapping("/test")
//    public void test(){
//        int num = 1;
//        Map<String, Object> map = new HashMap<>();
//
//        Person person = personService.selectPersonData(num);
//        System.out.println(person);
//        System.out.println(person.getPer_name());
//
//    }
//    @GetMapping("/")
//    public String home(){
//        int num = 1;
//        Map<String, Object> map = new HashMap<>();
//
//
//        Person person = personService.selectPersonData(num);
//        System.out.println(person);
//        System.out.println(person.getPer_name());
//
//        return "/";
//    }
    @GetMapping("/selectMovieData")
    public Movie selectMovieData(@RequestParam String movie_pk) {

        return movieService.selectMovieData(movie_pk);

    }

    @GetMapping("/selectMovieList")
    public String selectMovieList() {

        // 1. 현재 시각 기준 1주일 기간동안의 총 좌석 갯수 구하기
        LocalDate date = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String now_date = date.format(dtf);
        String before_date = date.minusWeeks(1).format(dtf);     // 조회 하는 날기준 1주일 전

        Map<String, String> map = new HashMap<>();
        map.put("before_date", before_date);
        map.put("now_date", now_date);


        // 2. joinmovie 데이터 가져오기


        return "test";
    }


}
