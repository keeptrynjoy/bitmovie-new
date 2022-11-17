package data.service.movie;

import data.domain.movie.Cast;
import data.domain.movie.JoinMovie;
import data.domain.movie.JoinRevw;
import data.domain.movie.Movie;
import data.repository.movie.*;
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

    public Movie selectMovieData(String movie_pk){
        return movieRepository.selectMovieData(movie_pk);
    }

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

        return joinMovieRepository.selectMovieList(map);
    }

    public List<Cast> selectCastList(String movie_pk){
        return castRepository.selectCastList(movie_pk);
    }

    public List<JoinRevw> selectJoinRevw(String movie_pk) {
        return joinRevwRepository.selectJoinRevw(movie_pk);
    }
}
