package data.controller.api;

import data.service.api.TheMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TheMovieController {

    private final TheMovieService theMovieService;

    @GetMapping("/TMDBapi")
    @ResponseBody
    @Scheduled(cron="0 0 1 * * *", zone = "Asia/Seoul")
    public String TMDBapi(){

        /*
         * db 에 저장시킬 번호를 입력 숫자 1당 20개씩 저장.
         * 예시) 숫자 1 입력시 순위 1~20인 영화가 저장
         *     숫자 2 입력시 순위 21~40인 영화가 저장
         * */
        int page_num = 1;

        //해당 페이지에 있는 영화 id를 반환
        List<Object> movie_id_list = theMovieService.movieListApi(page_num);
//        System.out.println("controller: list "+movie_id_list);

        for (int i = 0; i < movie_id_list.size(); i++) {
            // movie_id 를 통해 더무비 에서 제공해주는 영화 상세정보를 db에 저장
            theMovieService.movieDataSave(movie_id_list.get(i));
            // 해당 영화의 등장인물 정보 저장
            theMovieService.personDataList(movie_id_list.get(i));
        }

        return "TMDB 작업";
    }

}