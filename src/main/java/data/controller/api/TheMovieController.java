package data.controller.api;

import data.service.api.TheMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@Controller
public class TheMovieController {

    @Autowired
    TheMovieService theMovieService;

    @GetMapping("/TMDBapi")
    @ResponseBody
    public String TMDBapi(){

        /*
         * db 에 저장시킬 번호를 입력 숫자 1당 20개씩 저장.
         * 예시) 숫자 1 입력시 순위 1~20인 영화가 저장
         *     숫자 2 입력시 순위 21~40인 영화가 저장
         * */
        int page_num = 2;

        //해당 페이지에 있는 영화 id를 반환
        List<Object> movie_id_list = theMovieService.movieListApi(page_num);
        System.out.println("controller: list "+movie_id_list);

        // movie_id 를 통해 더무비 에서 제공해주는 영화 상세정보를 db에 저장
        theMovieService.movieDataSave(movie_id_list);

        // movie_id 를 통해 더무비 포스터를 db에 저장
        theMovieService.updatePhoto(movie_id_list);

        // 해당 영화의 등장인물 id 출력
        theMovieService.personDataList(movie_id_list);

        return "TMDB 작업";
    }







}