package data.service.api;

import data.domain.movie.Cast;
import data.domain.movie.Movie;
import data.domain.movie.Person;
import data.repository.movie.CastRepository;
import data.repository.movie.MovieRepository;
import data.repository.movie.PersonRepository;
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
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TheMovieService {

    static final String TMDB_IMG_URL = "https://image.tmdb.org/t/p/";
    static final String TMDB_URL = "https://api.themoviedb.org/3/";
    static final String TMDB_KEY = "api_key=7a447c04dbde1f8464230be65ef469eb";
    static final String TMDB_KO = "&language=ko";

    @Autowired
    MovieRepository movieRepository;
    @Autowired
    CastRepository castRepository;
    @Autowired
    PersonRepository personRepository;

    //page_num 을 받아 (page_num*20+1)~(page_num*20+21)까지의 영화 고유 번호를 list에 담아 반환
    public List<Object> movieListApi(int page_num) {

        //movie_id 를 담을 변수 선언
        List<Object> movie_id_lsit = new ArrayList<>();

        //url 작성
        String tmdb_list_url = TMDB_URL + "movie/popular?page=" + page_num + "&" + TMDB_KEY + TMDB_KO;

        // url 의 데이터를 jsonobject 로 반환
        JSONObject jsonObject = getDataByURL(tmdb_list_url);

        //jsonobject 에 접근해 movie_id만 반환하기
        JSONArray jsonArray = (JSONArray) jsonObject.get("results");
        for (int i = 0; i < jsonArray.size(); i++) {
            jsonObject = (JSONObject) jsonArray.get(i);
            String movie_id = jsonObject.get("id").toString();
            // db에 들어있는지를 판단해 없는 영화만 list에 add 한다.
            int movieYoN = movieRepository.selectMovieYoN(movie_id);
            if (movieYoN == 0) {
                movie_id_lsit.add(movie_id);
            }
        }
        return movie_id_lsit;
    }//movieListApi

    //movie id 를 통해 영화 상세정보를 db에 저장
    public void movieDataSave (Object movie_id) {
        //사용되는 변수선언
        boolean result = false;
        JSONObject jsonObject;
        JSONArray jsonArray;


//        for(int i=0; i<movie_id_lsit.size(); i++){

            String movie_type="";   // 영화 장르
            String name = "";       // 영화 제목
            String sdate = "";      // 상영 시작일
            String edate = "";      // 상영 종료일 (시작일+3달)
            String info = "...";    // 줄거리
            int runtime = 0;        // 런타임
            String country = "US";

            //url 선언
            String detail_url = TMDB_URL + "movie/" + movie_id + "?" + TMDB_KEY + TMDB_KO;
            //url 의 데이터를 jsonobject로 반환

            jsonObject = getDataByURL(detail_url);

            name = jsonObject.get("title").toString();
            runtime = Integer.parseInt(jsonObject.get("runtime").toString());

            // 제작 국가 정보
            JSONArray countryArray = (JSONArray) jsonObject.get("production_countries");
            if(countryArray.size()!=0){     // 데이터 가 없는 경우 초기 값 US 로 저장.
                country = ((JSONObject) countryArray.get(0)).get("name").toString();
            }

            // 영화 개봉일 상영 종료일 계산
            sdate = jsonObject.get("release_date").toString();
            // edate 계산 Edate = sdate + 3달
            DateTimeFormatter dtformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.KOREA);
            LocalDate date = LocalDate.parse(sdate, dtformatter);
            edate = date.plusMonths(3).toString();

            //영화 소개 글 존재 유무에 따라 데이터 저장
            if(!(jsonObject.get("overview").toString().trim().equals(""))){
                info = jsonObject.get("overview").toString();
            }

            // 장르에 대한 정보 가져오기 ,로 연결해 String 에 담기
            jsonArray = (JSONArray) jsonObject.get("genres");
            movie_type = "";
            for (int j = 0; j < jsonArray.size(); j++) {
                jsonObject = (JSONObject) jsonArray.get(j);
                movie_type += jsonObject.get("name").toString();
                movie_type += ",";
            }
            movie_type = movie_type.substring(0, movie_type.length() - 1);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");


            //Repository 를 호출해 db에 저장
            movieRepository.insertDetailData(
                    Movie.movieBuilder()
                            .movie_pk(Integer.parseInt(movie_id.toString()))
                            .m_name(name)
                            .m_type(movie_type)
                            .m_sdate(sdate)
                            .m_edate(edate)
                            .m_runtime(runtime)
                            .m_info(info)
                            .m_country(country)
                            .build()
            );


//        }//for

    }//movieDataSave

    // 영화의 영어 이름 정보 저장
    public void updateEnName(Object movie_id) {
        // 사용될 변수 선언
        JSONObject jsonObject;
        JSONArray jsonArray;
        String enname = "";
        Map<String, Object> map = new HashMap<>();

        // movie_id 를 가지고 api 에 접근해 데이터 가져오기
        String enName_url = TMDB_URL + "movie/" + movie_id + "?" + TMDB_KEY;
        jsonObject = getDataByURL(enName_url);
        enname = jsonObject.get("title").toString();

        // enname 를 db에 저장
        map.put("column","m_enname");
        map.put("data", enname);
        map.put("movie_pk", movie_id);
        movieRepository.updateDataOne(map);
    }//updateEnName


    // 영화 트레일러 db에 저장
    public void updateVideo(Object movie_id) {
        // 사용 될 변수 선언
        JSONObject jsonObject;
        JSONArray jsonArray;
        String video_url = "";
        String video = "";
        Map<String, Object> map = new HashMap<>();

        // movie_id 로 트레일러가 담긴 json 데이터를 반환하기
        video_url = TMDB_URL + "movie/" + movie_id + "/videos?" + TMDB_KEY;
        jsonObject = getDataByURL(video_url);
        jsonArray = (JSONArray) jsonObject.get("results");

        // 값이 존재하는 경우에만 읽어오기
        if(jsonArray.size()>0){
            video = ((JSONObject) jsonArray.get(0)).get("key").toString();
            System.out.println(video);

            // db에 데이터를 저장
            map.put("column","m_video");
            map.put("data", video);
            map.put("movie_pk", movie_id);
            movieRepository.updateDataOne(map);
        }

    }

    // 영화 포스터 db 에 저장.
    public void updatePhoto (Object movie_id){
        JSONObject jsonObject;
        JSONArray jsonArray;

        // movie_id 를 통해 해당 영화의 포스터를 추출 및 db에 저장
        String photo;
        int movie_pk;
        Map<String, Object> map = new HashMap<>();

        String tmepurl = TMDB_URL + "movie/" + movie_id + "/images?" + TMDB_KEY;

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

        movie_pk = Integer.parseInt(movie_id.toString());
        map.put("movie_pk", movie_pk);
        map.put("column", "m_photo");
        map.put("data", photo);
        //db에 저장
        movieRepository.updateDataOne(map);

    }//updatePhoto



    // 인물 정보 저장
    public Map<String, Object> personDataList(Object movie_id){
        Map<String, Object> map = new HashMap<>();
        Set<Object> per_id_list_total = new HashSet<>();    // 전체 영화의 등장인물 id 정보
        List<Object> per_id_lsit = new ArrayList<>();          // 한 영화의 등장인물 id 정보
        JSONObject jsonObject;
        JSONArray jsonArray;
        int person_pk =0;

        // 해당 영화의 등장인물정보를 반환.
//        for (int i = 0; i < movie_id_lsit.size(); i++) {
//            System.out.println(movie_id_lsit.get(i));
        String url_credits = TMDB_URL + "movie/" + movie_id + "/credits?" + TMDB_KEY;
        jsonObject = getDataByURL(url_credits);
        jsonArray = (JSONArray) jsonObject.get("cast");

        // movie_id_list 의 영화들의 등장인물 id 를 전부 set list 에 저장 (한 영화당 15명까지만 저장)
        // (db에 존재하는 지 여부를 판단해 없는 경우만 tmdb에서 서치후 db에 저장할 예정)
        int limit = jsonArray.size()<15?jsonArray.size():15;
        for (int j = 0; j < limit; j++) {
            jsonObject = (JSONObject) jsonArray.get(j);
            System.out.println(jsonObject);

            // 등장인물의 cast_id 를 구하기
            person_pk = Integer.parseInt(jsonObject.get("cast_id").toString());
            // 이 인물정보가 db에 있는지 여부를 확인
            int personYoN = personRepository.selectPersonYoN(person_pk);
            // 해당 인물 정보가 없는경우 , person_tb에 데이터를 저장.
            if(personYoN==0){
                String per_name = jsonObject.get("original_name").toString();
                // 이미지가 null 인 경우에 대한 처리
                String per_photo = "";
                Object object = jsonObject.get("profile_path");
                Optional<Object> profile_path = Optional.ofNullable(object);
                if (profile_path.isPresent()) {
                    per_photo = object.toString();
                }
                System.out.println("per_photo: "+per_photo);
                System.out.println("befoer person");
                personRepository.insertPersonData(
                        Person.personBuilder()
                                .person_pk(person_pk)
                                .per_name(per_name)
                                .per_photo(per_photo).build()
                );
            }//if
            // cast_tb 에 인물과 영화를 연결하는 정보 저장
            int movie_pk = Integer.parseInt(movie_id.toString());
            String cast_type = jsonObject.get("known_for_department").toString();
            System.out.println("before - cast");
            System.out.println("movie_pk: "+movie_pk);
            castRepository.insertCast(
                    Cast.castBuilder()
                            .movie_pk(movie_pk)
                            .cast_type(cast_type)
                            .person_pk(person_pk)
                            .build()
            );
            System.out.println("after - cast");

            per_id_list_total.add(jsonObject.get("credit_id"));
//            }//for
        }//for
        return map;
    }//personDataList



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
    }//getDataByURL2

}