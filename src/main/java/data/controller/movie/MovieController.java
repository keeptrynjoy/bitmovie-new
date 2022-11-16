package data.controller.movie;

import data.domain.movie.JoinMovie;
import data.domain.movie.Movie;
import data.service.movie.MovieService;
import data.service.movie.PersonService;
import data.service.movie.ScreenTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final PersonService personService;
    private final ScreenTimeService screenTimeService;


    // 영화 상세 정보 출력
    @GetMapping("/selectMovieData")
    public String selectMovieData(@RequestParam String movie_pk) {

        // 영화 상세 정보
        Movie movie_data = movieService.selectMovieData(movie_pk);

        // 영화 등장인물 정보


        // 영화 평점 정보



        return "test";
    }

    // 영화 리스트 출력
    @GetMapping("/selectMovieList")
    public List<JoinMovie> selectMovieList() {

        // 오늘 날짜를 기준으로 1주일 기간 을 설정해 예매율을 계산
        LocalDate date = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String now_date = date.format(dtf);
        String before_date = date.minusWeeks(1).format(dtf);     // 조회 하는 날기준 1주일 전

        Map<String, String> map = new HashMap<>();
        map.put("before_date", before_date);
        map.put("now_date", now_date);

        List<JoinMovie> movie_data_list = movieService.selectMovieList(map);
        System.out.println(movie_data_list);

        return movie_data_list;
    }


}
