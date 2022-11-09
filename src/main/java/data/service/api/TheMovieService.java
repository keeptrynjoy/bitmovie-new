package data.service.api;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class TheMovieService {

    static final String TMDB_IMG_URL = "https://image.tmdb.org/t/p/";
    static final String TMDB_URL = "https://api.themoviedb.org/3/";
    static final String TMDB_KEY = "7a447c04dbde1f8464230be65ef469eb";
    static final String TMDB_KO = "&language=ko";

    //영화 movie_id 를 반환하는 함수
//    public List<Object> movieListApi(String data){
//        JSONParser jsonParser = new JSONParser();
//        List<Object> movie_id_list = new ArrayList<>();
//
//        try {
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(data);
//            JSONArray jsonArray = (JSONArray) jsonObject.get("results");    //data 의 rsult 에 접근
//
//            for(int i=0; i<jsonArray.size(); i++){
//                jsonObject = (JSONObject) jsonArray.get(i);
//
//                Object movie_id = jsonObject.get("id");
//                movie_id_list.add(movie_id);
//            }
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }
//
//        return movie_id_list;
//    }

    public List<Object> movieListApi(int page_num){

        String TMDB_LIST_URL = TMDB_URL+"movie/popular?page="+page_num+"&api_key="+TMDB_KEY+TMDB_KO;


        try {
            URL url = new URL(TMDB_LIST_URL);
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
            String data = bf.readLine();
            System.out.println("next: "+ data);


            // 2. movie_id_list 를 통해

        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException ex){
            throw new RuntimeException(ex);
        }
        JSONParser jsonParser = new JSONParser();
        List<Object> movie_id_list = new ArrayList<>();

//        try {
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(data);
//            JSONArray jsonArray = (JSONArray) jsonObject.get("results");    //data 의 rsult 에 접근
//
//            for(int i=0; i<jsonArray.size(); i++){
//                jsonObject = (JSONObject) jsonArray.get(i);
//
//                Object movie_id = jsonObject.get("id");
//                movie_id_list.add(movie_id);
//            }
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }

        return movie_id_list;
    }


    //movie id 를 통해 영화 상세정보를 db에 저장
    public boolean movieDataSave(List<Object> movie_id_lsit){

        boolean result = false;
        
        

        return result;
    }

}
