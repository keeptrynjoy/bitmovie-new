package data.service.user;

import data.domain.movie.JoinCast;
import data.domain.movie.JoinMovie;
import data.domain.movie.JoinRevw;
import data.domain.movie.Person;
import data.repository.movie.JoinCastRepository;
import data.repository.movie.JoinMovieRepository;
import data.repository.movie.JoinRevwRepository;
import data.repository.movie.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    public List<JoinRevw> selectRecentRevw(int count) {
        return joinRevwRepository.selectRecentRevw(count);
    }

    public Map<String,Object> selectSearchData(String search) {
        System.out.println("search"+search);
        Map<String, Object> map = new HashMap<>();
        // 영화 정보 출력
        List<JoinMovie> movie_list = joinMovieRepository.selectSearchMovie(search);
        // 인물 정보 출력
        List<Person> people_list = personRepository.selectSearchList(search);
        // 출력되는 첫번째 인물의 상세 정보 출력
        if(people_list.size()!=0){
            int person_pk = people_list.get(0).getPerson_pk();
            List<JoinCast> person_detail = joinCastRepository.selectCastDetail(person_pk);
            map.put("person_detail", person_detail);
        }
        // controller 로 데이터 전달
        map.put("people_list", people_list);
        map.put("movie_list", movie_list);
        return map;
    }
}
