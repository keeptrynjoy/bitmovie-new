package data.service.user;

import data.domain.movie.JoinMovie;
import data.domain.movie.JoinRevw;
import data.domain.movie.Person;
import data.repository.movie.JoinMovieRepository;
import data.repository.movie.JoinRevwRepository;
import data.repository.movie.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final JoinRevwRepository joinRevwRepository;
    private final JoinMovieRepository joinMovieRepository;
    private final PersonRepository personRepository;

    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    public List<JoinRevw> selectRecentRevw(int count) {
        return joinRevwRepository.selectRecentRevw(count);
    }

    public void selectSearchData(String search) {
        System.out.println("search"+search);
        // 영화 정보 출력
        List<JoinMovie> searchMovieData = joinMovieRepository.selectSearchMovie(search);
        // 총 영화 갯수 출력
        int movie_cnt = searchMovieData.size();
        // 인물 정보 출력
        List<Person> peopleData = personRepository.selectSearchList(search);
        // 출력되는 첫번째 인물의 상세 정보 출력
        peopleData.get(0).getPerson_pk();

        System.out.println(movie_cnt);
        System.out.println(peopleData);

    }
}
