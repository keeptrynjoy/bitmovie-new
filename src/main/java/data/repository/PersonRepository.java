package data.repository;

import data.domain.Person;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PersonRepository {

    Person selectPersonData(int num);
}
