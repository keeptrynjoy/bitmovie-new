package data.service.api;

import data.domain.Movie;
import data.repository.MovieRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    MovieRepository movieRepository;

    //page_num 을 받아 (page_num*20+1)~(page_num*20+21)까지의 영화 고유 번호를 list에 담아 반환
    public List<Object> movieListApi(int page_num) {

        //movie_id 를 담을 변수 선언
        List<Object> movie_id_lsit = new ArrayList<>();

        //url 작성
        String tmdb_list_url = TMDB_URL + "movie/popular?page=" + page_num + "&api_key=" + TMDB_KEY + TMDB_KO;

        // url 의 데이터를 jsonobject 로 반환
        JSONObject jsonObject = getDataByURL(tmdb_list_url);

        //jsonobject 에 접근해 movie_id만 반환하기
        JSONArray jsonArray = (JSONArray) jsonObject.get("results");
        for (int i = 0; i < jsonArray.size(); i++) {
            jsonObject = (JSONObject) jsonArray.get(i);
            Object movie_id = jsonObject.get("id");
            movie_id_lsit.add(movie_id);
        }
        return movie_id_lsit;
    }

        //movie id 를 통해 영화 상세정보를 db에 저장
        public boolean movieDataSave (List <Object> movie_id_lsit) {
            //사용되는 변수선언
            boolean result = false;
            JSONObject jsonObject;


            for(int i=0; i<movie_id_lsit.size(); i++){
                //url 선언
                String detail_url = TMDB_URL+"movie/"+movie_id_lsit.get(i)+"?api_key="+TMDB_KEY+TMDB_KO;
                //url 의 데이터를 jsonobject로 반환
                jsonObject = getDataByURL(detail_url);
                System.out.println("data: "+jsonObject);
                System.out.println("m_name: "+jsonObject.get("title"));
                System.out.println("m_type: "+jsonObject.get("genres"));
                System.out.println("runtime: "+jsonObject.get("runtime"));
                System.out.println("m_info: "+jsonObject.get("overview"));
                System.out.println("m_sdate: "+jsonObject.get("release_date"));


//                movieRepository.insertDetailData(
//                        Movie.movieBuilder()
//                                .build()
//                );


//                movieRepository.save(
//                        Movie.builder()
//                                .description(contents.get("overview").toString())
//                                .title(contents.get("title").toString())
//                                .imgUrl(ImgUrl + contents.get("poster_path").toString().replaceAll(match, ""))
//                                .createdAt(dateTime)
//                                .modifiedAt(dateTime)
//                                .build()
//                );

            }
            return result;
        }

        //해당 url 의 데이터를 json 형태로 반환
        public JSONObject getDataByURL(String tmepurl){

            String data = "";
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject;

            try {
                URL url = new URL(tmepurl);
                BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
                data = bf.readLine();
                //data를 json 타입으로 변환
                jsonObject = (JSONObject) jsonParser.parse(data);

            } catch (MalformedURLException e) {
                throw new RuntimeException(e);
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            return jsonObject;
        }

}

