package data.repository.movie;

import data.domain.movie.Person;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PersonRepository {

    public Person selectPersonData(int num);

    public int selectPersonYoN(int person_pk);     // TMDB - 인물 정보가 db에 저장되어있는지 여부 체크

    public void insertPersonData(Person person);   //TMDB - 인물 정보 저장

    public List<Person> selectSearchList(String search);        // 메인화면 검색 - 인물정보 출력

}
