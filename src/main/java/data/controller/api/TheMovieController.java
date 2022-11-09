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

//
//        const json = await (
//            await fetch(
//            `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDT}`
//    )
//        ).json();
    @GetMapping("/TMDBapi")
    @ResponseBody
    public String TMDBapi(){

        /*
        * db 에 저장시킬 번호를 입력 숫자 1당 20개씩 저장.
        * 예시) 숫자 1 입력시 순위 1~20인 영화가 저장
        *     숫자 2 입력시 순위 21~40인 영화가 저장
        * */
        int page_num = 0;

//        String url = TMDB_URL + "movie/popular?api_key="+TMDB_KEY+TMDB_KO;
        List<Object> movie_id_list = theMovieService.movieListApi(page_num);

        // 1. movie list 를 불러와 movie id 를 list 에 담아준다.


//        String TMDB_LIST_URL = TMDB_URL + "movie/popular?api_key="+TMDB_KEY+TMDB_KO;
//        System.out.println(TMDB_LIST_URL);
//        try {
//            URL url = new URL(TMDB_LIST_URL);
//            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
//            String data = bf.readLine();
//            System.out.println("next: "+ data);
//            movie_id_list = theMovieService.movieListApi(data); //movie id list 를 반환
//
//            // 2. movie_id_list 를 통해
//
//        } catch (MalformedURLException e) {
//            throw new RuntimeException(e);
//        } catch (IOException ex){
//            throw new RuntimeException(ex);
//        }



        // 2. list 로 반복문을 돌려 해당 영화의 상세 정보를 가져온다.
        // 영화 기본 정보 가져오기


        // 영화 등장인물 정보 가져오기

        return "작업중";
    }







}
