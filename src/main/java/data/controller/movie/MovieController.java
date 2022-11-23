package data.controller.movie;

import data.domain.movie.*;
import data.service.movie.MovieService;
import data.service.movie.ScreenTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final ScreenTimeService screenTimeService;

    // 영화 상세 정보 출력
    @GetMapping("/selectMovieData")
    public Map<String, Object> selectMovieData(int movie_pk) {

        return movieService.selectMovieData(movie_pk);
    }

    // 영화 리스트 출력
    @GetMapping("/selectMovieList")
    public List<JoinMovie> selectMovieList(@RequestParam(defaultValue = "null") String order_stand,
                                           @RequestParam(defaultValue = "null") String BorA) {
        /*  front 에서 넘겨줄 값 - 아래의 형식으로 전달 바랍니다
            order_stand : 정렬 기준
            - 예매율순 인경우 "reserve_rate"
            - 평점순인 경우 "revw_avgstar"
            BorA : 상영중인 영화인지 개봉 예정인 영화인지 판단
            - 상영중 "after"
            - 개봉예정 "before"
        */
        List<JoinMovie> movie_data_list = movieService.selectMovieList(order_stand, BorA);
        return movie_data_list;
    }

    // 영화 페이지 - 상영시간표 출력
    @GetMapping("/selectTimeByMovie")
    public List<JoinTime> selectTimeByMovie(int movie_pk, String date){
        System.out.println("controller movie_pk: " + movie_pk);
        System.out.println("controller date: " + date);
        System.out.println(screenTimeService.selectTimeByMovie(movie_pk, date));
        return screenTimeService.selectTimeByMovie(movie_pk, date);
    }

    @GetMapping("selectTimetest")
    public List<Map<String,Object>> selectTimeTest(@RequestParam(defaultValue = "284054") int movie_pk){
        return movieService.selectTimeByMovieTest(movie_pk);
    }
}