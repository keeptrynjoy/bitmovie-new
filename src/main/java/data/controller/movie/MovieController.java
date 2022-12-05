package data.controller.movie;

import data.controller.api.TheMovieController;
import data.domain.movie.*;
import data.service.api.TheMovieService;
import data.service.movie.MovieService;
import data.service.movie.ScreenTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final ScreenTimeService screenTimeService;
    private final TheMovieController theMovieController;
    private final TheMovieService theMovieService;

    // 영화 상세 정보 출력
    @GetMapping("/selectMovieData")
    public Map<String, Object> selectMovieData(int movie_pk) {
        Map<String, Object> movie_detail = movieService.selectMovieData(movie_pk);
        // 해당 영화가 db에 없으면 tmdb api 를 통해 정보 저장 후 데이터 가져오기
        if (movie_detail.get("data") == null) {
            theMovieService.movieDataSave(movie_pk);    // 영화 상세 정보 저장
            theMovieService.personDataList(movie_pk);   // 영화 등장인물 정보 저장
            movie_detail = movieService.selectMovieData(movie_pk);
        }
        return movie_detail;
    }

    // 평점 좋아요 리스트 출력
    @GetMapping("selectLikeRevwList")
    public List<Integer> selectLikeRevwList(int user_pk, int movie_pk) {
        return movieService.selectLikeRevwList(user_pk, movie_pk);
    }

    // 영화 리스트 출력
    @GetMapping("/selectMovieList")
    public List<JoinMovie> selectMovieList(@RequestParam(defaultValue = "m_name") String order_stand,
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

    // 영화 좋아요 리스트 출력 (movie_pk 를 반환)
    @GetMapping("selectMWishList")
    public List<Integer> selectMWishList(@RequestParam(defaultValue = "0") int user_pk) {
        List<Integer> list = new ArrayList<>();
        System.out.println(movieService.selectMWishList(user_pk));
        return movieService.selectMWishList(user_pk);
    }

    // 영화 페이지 - 상영시간표 출력
    @GetMapping("/selectTimeByMovie")
    public List<JoinTime> selectTimeByMovie(int movie_pk, String date) {
        return screenTimeService.selectTimeByMovie(movie_pk, date);
    }

    // 영화 상세페이지 - 상영시간표
    @GetMapping("/timeByMovieDetail")
    public List<Map<String, Object>> selectTimeByMovieDetail(@RequestParam int movie_pk, @RequestParam String date) {
        return movieService.selectTimeByMovieDetail(movie_pk, date);
    }

    @GetMapping("/selectLikes")
    public int selectLikes(@RequestParam String movie_pk) {
        return movieService.selectLikes(Integer.parseInt(movie_pk));
    }
}