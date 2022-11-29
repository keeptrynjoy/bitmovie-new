package data.service.user;

import data.domain.movie.*;
import data.repository.movie.*;
import data.repository.user.LikeRevwRepository;
import data.repository.user.MWishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MainService {

    private final JoinRevwRepository joinRevwRepository;
    private final JoinMovieRepository joinMovieRepository;
    private final PersonRepository personRepository;
    private final JoinCastRepository joinCastRepository;
    private final JoinTimeRepository joinTimeRepository;
    private final MWishRepository mWishRepository;
    private final MovieRepository movieRepository;
    private final LikeRevwRepository likeRevwRepository;

    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    public List<JoinRevw> selectRecentRevw(int count, int user_pk) {
        List<JoinRevw> joinRevws = joinRevwRepository.selectRecentRevw(count);
        if(user_pk!=0){
            for (int i = 0; i < joinRevws.size(); i++) {
                // 좋아요 클릭 여부를 판단해
                boolean yorN = likeRevwRepository.likeYorN(joinRevws.get(i));
                // 해당 값을 joinRevws 에 담아 반환한다
                joinRevws.get(i).setLikeYorN(yorN);
            }
        }
        return joinRevws;
    }

    // 검색 기능 - 영화 , 인물정보 검색
    public Map<String,Object> selectSearchData(String search) {
        Map<String, Object> map = new HashMap<>();
        // 영화 정보 출력
        List<JoinMovie> movie_list = joinMovieRepository.selectSearchMovie(search);

        String movie_state = "before";
        for(int i= movie_list.size()-1; i>=0; i--){
            int movie_pk = movie_list.get(i).getMovie_pk();
            // 영화 평점정보 등록
            int wish = mWishRepository.selectWishCnt(movie_pk);
            movie_list.get(i).setWish_cnt(wish);

            // 영화 상영 예정인지 여부 확인
            LocalDate now = LocalDate.now();
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String date = now.format(dtf);
            Map<String, Object> temp = new HashMap<>();
            map.put("movie_pk", movie_pk);
            map.put("date", date);
            // movie_list 가 개봉일 기준으로 정렬되어 있어 아래와 같이 코드를 작성.
            int state;
            switch (movie_state){
                case "before" :
                    state = movieRepository.selectComingorNot(temp);
                    System.out.println(state);
                    if(state==1){
                        movie_list.get(i).setIng_or_not(movie_state);
                        break;
                    } else movie_state = "ing";
                case "ing" :
                    state = movieRepository.selectIngOrNot(temp);
                    if(state==1){
                        movie_list.get(i).setIng_or_not(movie_state);
                        break;
                    } else movie_state = "after";
                case "after" : 
                    movie_list.get(i).setIng_or_not(movie_state);
                    break;
            }
        }

        // 인물 정보 출력
        List<Person> people_list = personRepository.selectSearchList(search);
        // controller 로 데이터 전달
        map.put("people_list", people_list);
        map.put("movie_list", movie_list);
        return map;
    }

    // 검색 기능 - 검색되니 인물정보중 첫번째 인물의 디테일 정보반환
    public List<JoinCast> selectSearchDetail(int person_pk) {
        return joinCastRepository.selectCastDetail(person_pk);
    }


    // 희준 테스트 1
    public List<JoinTime> selectTimeByClick(int movie_pk, int theater_pk, String date){
        Map<String, Object> map = new HashMap<>();
        map.put("movie_pk", movie_pk);
        map.put("date", date);
        map.put("theater_pk", theater_pk);
        return joinTimeRepository.selectTimeByClick(map);
    }

    // 희준 테스트 2
    public List<JoinTime> testMovieTime(int movie_pk, int theater_pk, String date) {

        // 오늘 날짜를 기준으로 1주일 기간 을 설정해 상영중인 영화 출력
        LocalDate now = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String now_date = now.format(dtf);
        String after_date = now.plusDays(7).format(dtf);     // 조회 하는 날기준 1주일 전

        System.out.println("movie: "+movie_pk);
        System.out.println("theater: " + theater_pk);
        System.out.println("date: "+date);

        Map<String, Object> map = new HashMap<>();
        map.put("movie_pk", movie_pk);
        map.put("date", date);
        map.put("theater_pk", theater_pk);
        return joinTimeRepository.testMovieTime(map);
    }
}
