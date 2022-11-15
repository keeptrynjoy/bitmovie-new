package data.repository.movie;

import data.domain.movie.Person;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PersonRepository {

    Person selectPersonData(int num);

    int selectPersonYoN(int person_pk);
    // TMDB - 인물 정보가 db에 저장되어있는지 여부 체크

    void insertPersonData(Person person);
    //TMDB - 인물 정보 저장
}
