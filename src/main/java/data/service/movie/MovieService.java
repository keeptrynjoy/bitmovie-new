package data.service.movie;

import data.domain.movie.*;
import data.repository.movie.*;
import data.repository.user.MWishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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
    private final CastRepository castRepository;
    private final JoinRevwRepository joinRevwRepository;
    private final JoinCastRepository joinCastRepository;
    private final MWishRepository mWishRepository;
    private final JoinTimeRepository joinTimeRepository;
    

    public List<JoinMovie> selectMovieList(String order_stand, String BorA) {
        System.out.println(order_stand);

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

        for(int i=0; i<data.size(); i++){
            int movie_pk = data.get(i).getMovie_pk();
            int wish = mWishRepository.selectWishCnt(movie_pk);
            data.get(i).setWish_cnt(wish);
        }
        return data;
    }

    // 영화 상세 페이지 - 영화 정보 출력
    public Map<String,Object> selectMovieData(int movie_pk) {
        
        // 1. 영화 정보 출력
        Movie movie_data = movieRepository.selectMovieData(movie_pk);
        // 2. 영화 등장인물 정보 반환
        List<JoinCast> cast_list = joinCastRepository.selectCastByMovie(movie_pk);
        // 3. 영화 평점 정보 반환
        List<JoinRevw> review_list = joinRevwRepository.selectJoinRevw(movie_pk);

        int wish_cnt = mWishRepository.selectWishCnt(movie_pk);

        // controller 로 데이터 전달
        Map<String, Object> map = new HashMap<>();
        map.put("data", movie_data);
        map.put("cast", cast_list);
        map.put("revw", review_list);
        map.put("wish_cnt", wish_cnt);
        return map;
    }

    public List<Map<String,Object>> selectTimeByMovieTest(int movie_pk){
        String date = "2022-11-21";
        Map<String, Object> map = new HashMap<>();
        map.put("movie_pk", movie_pk);
        map.put("date", date);
        List<Map<String, Object>> theaters_list = joinTimeRepository.selectTimeByMovieTest(map);
        for (int i = 0; i < theaters_list.size(); i++) {
            Object theater = theaters_list.get(i).get("theater_pk");
            int theateer_pk = Integer.parseInt(theater.toString());
        }

        return joinTimeRepository.selectTimeByMovieTest(map);
    }
}
