package data.repository;

import data.domain.Movie;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieRepository {

    public void insertDetailData(Movie movie);

}
