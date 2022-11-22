package data.service.user;

import data.domain.movie.*;
import data.repository.movie.*;
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

    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    public List<JoinRevw> selectRecentRevw(int count) {
        return joinRevwRepository.selectRecentRevw(count);
    }

    // 검색 기능 - 영화 , 인물정보 검색
    public Map<String,Object> selectSearchData(String search) {
        System.out.println("search"+search);
        Map<String, Object> map = new HashMap<>();
        // 영화 정보 출력
        List<JoinMovie> movie_list = joinMovieRepository.selectSearchMovie(search);
        // 인물 정보 출력
        List<Person> people_list = personRepository.selectSearchList(search);
        // 출력되는 첫번째 인물의 상세 정보 출력
//        if(people_list.size()!=0){
//            int person_pk = people_list.get(0).getPerson_pk();
//            List<JoinCast> person_detail = joinCastRepository.selectCastDetail(person_pk);
//            map.put("person_detail", person_detail);
//        }
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
