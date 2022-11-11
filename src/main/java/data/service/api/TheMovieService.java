package data.service.api;

import data.domain.movie.Movie;
import data.repository.movie.MovieRepository;
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
import java.util.*;

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
//        Optional<JSONObject> urldata = getDataByURL(tmdb_list_url);
//        JSONObject jsonObject = urldata.get();
        JSONObject jsonObject = getDataByURL(tmdb_list_url);

        //jsonobject 에 접근해 movie_id만 반환하기
        JSONArray jsonArray = (JSONArray) jsonObject.get("results");
        for (int i = 0; i < jsonArray.size(); i++) {
            jsonObject = (JSONObject) jsonArray.get(i);
            Object movie_id = jsonObject.get("id");
            movie_id_lsit.add(movie_id);
        }
        return movie_id_lsit;
    }//movieListApi

    //movie id 를 통해 영화 상세정보를 db에 저장
    public void movieDataSave (List <Object> movie_id_lsit) {
        //사용되는 변수선언
        boolean result = false;
        JSONObject jsonObject;
        JSONArray jsonArray;


        for(int i=0; i<movie_id_lsit.size(); i++){

            String movie_type="";
            String name = "";
            String sdate = "";
            String info = "...";
            int runtime = 0;
            String movie_info = "...";

            //url 선언
            String detail_url = TMDB_URL+"movie/"+movie_id_lsit.get(i)+"?api_key="+TMDB_KEY+TMDB_KO;
            //url 의 데이터를 jsonobject로 반환


            jsonObject = getDataByURL(detail_url);
            System.out.println("data: "+jsonObject);

            System.out.println("m_name: "+jsonObject.get("title"));
            name = jsonObject.get("title").toString();
            sdate = jsonObject.get("release_date").toString();
            runtime = Integer.parseInt(jsonObject.get("runtime").toString());

            //영화 소개 글 존재 유무에 따라 데이터 저장
            if(!(jsonObject.get("overview").toString().trim().equals(""))){
                info = jsonObject.get("overview").toString();
            }
            System.out.println(info);

            // 장르에 대한 정보 가져오기 ,로 연결해 String 에 담기
            jsonArray = (JSONArray) jsonObject.get("genres");
            movie_type = "";
            for (int j = 0; j < jsonArray.size(); j++) {
                jsonObject = (JSONObject) jsonArray.get(j);
                movie_type += jsonObject.get("name").toString();
                movie_type += ",";
            }
            movie_type = movie_type.substring(0, movie_type.length() - 1);
            System.out.println(i+name);


            //Repository 를 호출해 db에 저장
            movieRepository.insertDetailData(
                    Movie.movieBuilder()
                            .movie_pk(Integer.parseInt(movie_id_lsit.get(i).toString()))
                            .m_name(name)
                            .m_type(movie_type)
                            .m_sdate(sdate)
                            .m_runtime(runtime)
                            .m_info(info)
                            .build()
            );


//            jsonObject = getDataByURL(detail_url);

        }//for

    }//movieDataSave

    // 영화 포스터 db 에 저장.
    public void updatePhoto (List <Object> movie_id_lsit){
        JSONObject jsonObject;
        JSONArray jsonArray;

        // movie_id 를 통해 해당 영화의 포스터를 추출 및 db에 저장
        for (int i = 0; i < movie_id_lsit.size(); i++) {
            String photo;
            int movie_pk;
            Map<String, Object> map = new HashMap<>();

            String tmepurl = TMDB_URL + "movie/"+movie_id_lsit.get(i)+"/images?api_key="+TMDB_KEY;

            jsonObject = getDataByURL(tmepurl);
            jsonArray = (JSONArray) jsonObject.get("posters");

            //포스터 추출
            photo="";   //photo 변수 초기화
            int limts=10;   //사진 파일이 많을 경우 추출갯수를 10개로 제한
            if(jsonArray.size()<10)
                limts=jsonArray.size();
            for(int j=0; j<limts; j++){
                jsonObject = (JSONObject) jsonArray.get(j);
                photo += jsonObject.get("file_path").toString();
                photo += ",";
            }
            photo = photo.substring(0, photo.length() - 1);
            System.out.println(photo);

            movie_pk = Integer.parseInt(movie_id_lsit.get(i).toString());
            map.put("movie_pk", movie_pk);
            map.put("m_photo", photo);

            //db에 저장
            movieRepository.updatePhoto(map);


        }//for

    }//updatePhoto

//    public List<Object>



    //해당 url 의 데이터를 json 형태로 반환
    public Optional<JSONObject> getDataByURL2(String tmepurl){

        String data = "";
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject;
        Optional<JSONObject> result;

        try {
            URL url = new URL(tmepurl);
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
            data = bf.readLine();
            //data를 json 타입으로 변환
            result = Optional.ofNullable((JSONObject) jsonParser.parse(data));

        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return result;
    }//getDataByURL2

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
    }//getDataByURL2

}