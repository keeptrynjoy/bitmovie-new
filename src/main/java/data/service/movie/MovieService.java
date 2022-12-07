package data.service.movie;

import data.domain.movie.*;
import data.repository.movie.*;
import data.repository.user.LikeRevwRepository;
import data.repository.user.MWishRepository;
import data.service.api.TheMovieService;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MovieService {


    private final MovieRepository movieRepository;
    private final JoinMovieRepository joinMovieRepository;
    private final JoinRevwRepository joinRevwRepository;
    private final JoinCastRepository joinCastRepository;
    private final MWishRepository mWishRepository;
    private final JoinTimeRepository joinTimeRepository;
    private final LikeRevwRepository likeRevwRepository;
    private final TheMovieService theMovieService;


    // 영화 페이지 - 영화 리스트 출력
    public List<JoinMovie> selectMovieList(String order_stand, String BorA ){

        // 오늘 날짜를 기준으로 1주일 기간 을 설정해 예매율을 계산
        LocalDate date = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String now_date = date.format(dtf);
        String before_date = date.minusWeeks(1).format(dtf);     // 조회 하는 날기준 1주일 전

        // Map 에 정보를 담아 service 로 전달
        Map<String, String> map = new HashMap<>();
        map.put("before_date", before_date);    // 예매율 계산 시작 날짜
        map.put("now_date", now_date);          // 예매율 계산 마지막(오늘) 날짜
        map.put("order_stand", order_stand);    // 정렬기준 - 예매율순(reserve_rate), 평점순(revw_avgstar), default 값은 가나다순
        map.put("BorA", BorA);                  // 상영중(A) , 상영예정(B) 영화만 출력

        List<JoinMovie> data = joinMovieRepository.selectMovieList(map);

        // 영화 좋아요 갯수 & 좋아요 유무 구해서 data에 넣어주기
        for(int i=0; i<data.size(); i++){
            int movie_pk = data.get(i).getMovie_pk();
            // 영화 좋아요 갯수 정보 저장
            int wish = mWishRepository.selectWishCnt(movie_pk);
            data.get(i).setWish_cnt(wish);
        }
        return data;
    }

    // 영화 상세 페이지 - 영화 정보 출력
    public Map<String,Object> selectMovieData(int movie_pk) {

        // 1. 영화 정보 출력
        Movie movie_data = movieRepository.selectMovieData(movie_pk);
        Map<String, Object> map = new HashMap<>();

        if (movie_data == null) {
            theMovieService.movieDataSave(movie_pk);
            theMovieService.personDataList(movie_pk);
            movie_data = movieRepository.selectMovieData(movie_pk);
        }
        map.put("data", movie_data);
        // 2. 영화 등장인물 정보 반환
        List<JoinCast> cast_list = joinCastRepository.selectCastByMovie(movie_pk);
        // 3. 영화 평점 정보 반환
        List<JoinRevw> review_list = joinRevwRepository.selectJoinRevw(movie_pk);
        // 해당 영화 좋아요 갯수
        int wish_cnt = mWishRepository.selectWishCnt(movie_pk);

        map.put("cast", cast_list);
        map.put("revw", review_list);
        map.put("wish_cnt", wish_cnt);
        // 4. 영화 예매 차트 정보
        List<Map<String, Object>> chart = joinMovieRepository.movieChart(movie_pk);
        int total = chart.size();
        int male = 0;
        int female = 0;
        int age10 = 0;
        int age20 = 0;
        int age30 = 0;
        int age40 = 0;
        int age50 = 0;
        int age = 0;
        for (int i = 0; i < total; i++) {
            String gender = chart.get(i).get("u_gender").toString();
            // 성별 정보 저장
            if(gender.equals("male"))
                male++;
            else
                female++;
            // 연령대 정보 저장
            String u_birth = chart.get(i).get("u_birth").toString();
            int birth = Integer.parseInt(u_birth.substring(0,4));
            int year = LocalDate.now().getYear();
            switch ((year-birth+1)/10){
                case 1: age10++; break;
                case 2: age20++; break;
                case 3: age30++; break;
                case 4: age40++; break;
                case 5: age50++; break;
                default: age++; break;
            }
        }
        Map<String, Object> chart_data = new HashMap<>();
        chart_data.put("tot", total);
        chart_data.put("male", male);
        chart_data.put("female", female);
        chart_data.put("age10", age10);
        chart_data.put("age20", age20);
        chart_data.put("age30", age30);
        chart_data.put("age40", age40);
        chart_data.put("age50", age50);
        chart_data.put("age", age);
        map.put("chart", chart_data);


        return map;
    }

    // 영화 상세페이지 - 상영시간표
    public List<Map<String,Object>> selectTimeByMovieDetail(int movie_pk, String date){
        Map<String, Object> map = new HashMap<>();
        map.put("movie_pk", movie_pk);
        map.put("date", date);
        // 극장 정보 반환
        List<Map<String, Object>> theaters_list = joinTimeRepository.selectTheaterByTime(map);
        // 극장 정보 안에 배열형태로 데이터 삽입
        for (int i = 0; i < theaters_list.size(); i++) {
            // 극장pk 읽어들이기
            int theater_pk = Integer.parseInt(theaters_list.get(i).get("theater_pk").toString());
            map.put("theater_pk", theater_pk);
            // 극장에 해당하는 상영관 정보 불러와 극장 정보에 삽입
            List<Map<String, Object>> screen_list = joinTimeRepository.selectScreenByTheater(map);
            theaters_list.get(i).put("screen", screen_list);
            // 상영관 안에 상영시간표 배열형태로 데이터 삽입
            for (int k = 0; k < screen_list.size(); k++) {
                // 상영관 pk 읽어들이기
                int screen_pk = Integer.parseInt(screen_list.get(k).get("screen_pk").toString());
                map.put("screen_pk", screen_pk);
                // 상영관에 해당하는 상영 시간표 정보 반환
                List<Map<String, Object>> time_list = joinTimeRepository.selectTimeByScreen(map);
                screen_list.get(k).put("time", time_list);
            }
        }
        return theaters_list;
    }

    public List<Integer> selectLikeRevwList(int user_pk, int movie_pk) {
        Map<String, Integer> map = new HashMap<>();
        map.put("user_pk", user_pk);
        map.put("movie_pk", movie_pk);
        return likeRevwRepository.LikeRevwList(map);
    }

    public List<Integer> selectMWishList(int user_pk) {
        return mWishRepository.selectMWishList(user_pk);
    }

    public int selectLikes(int movie_pk) {return mWishRepository.selectLikes(movie_pk);}
}
