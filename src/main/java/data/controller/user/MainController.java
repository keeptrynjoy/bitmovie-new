package data.controller.user;

import data.domain.movie.JoinCast;
import data.domain.movie.JoinRevw;
import data.domain.movie.JoinTime;
import data.service.user.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final MainService mainService;


    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    @GetMapping("/selectRecentRevw")
    public List<JoinRevw> selectRecentRevw(@RequestParam(defaultValue = "10") int count) {
        List<JoinRevw> joinRevws = mainService.selectRecentRevw(count);
        System.out.println(joinRevws);
        return joinRevws;
    }

    // 검색 기능
    @GetMapping("/search")
    public Map<String,Object> search(String search){
        return mainService.selectSearchData(search);
    }

    // 검색기능 - 검색된 인물중 첫번째 인물의 상세정보 반환
    @GetMapping("/searchDetail")
    public List<JoinCast> searchDetail(int person_pk) {
        return mainService.selectSearchDetail(person_pk);
    }

    @GetMapping("/selectMovieTime")
    public List<JoinTime> selectTimeByClick(@RequestParam(defaultValue = "0") int movie_pk,
                                            @RequestParam(defaultValue = "0") int theater_pk,
                                            @RequestParam(defaultValue = "") String date) {

        return mainService.selectTimeByClick(movie_pk, theater_pk, date);
    }

    @GetMapping("/testMovieTime")
    public List<JoinTime> testMovieTime(@RequestParam(defaultValue = "0") int movie_pk,
                              @RequestParam(defaultValue = "0") int theater_pk,
                              @RequestParam(defaultValue = "null") String date) {

         return mainService.testMovieTime(movie_pk, theater_pk, date);
    }



}
