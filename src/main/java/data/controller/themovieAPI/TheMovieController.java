package data.controller.themovieAPI;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TheMovieController {

    static final String TMDB_IMG_URL = "https://image.tmdb.org/t/p/";
    static final String TMDB_URL = "https://api.themoviedb.org/3/";
    static final String TMDB_KEY = "7a447c04dbde1f8464230be65ef469eb";

//
//        const json = await (
//            await fetch(
//            `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDT}`
//    )
//        ).json();
    @GetMapping("/testapi")
    public void testcontrol(){

    }





    // 1. movie list 를 불러와 movie id 를 list 에 담아준다.

    String TMDB_LIST_URL = TMDB_URL + "";


    // 2. list 로 반복문을 돌려 해당 영화의 상세 정보를 가져온다.
    // 영화 기본 정보 가져오기


    // 영화 등장인물 정보 가져오기



}
