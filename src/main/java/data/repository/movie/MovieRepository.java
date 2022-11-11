package data.repository.movie;

import data.domain.movie.Movie;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieRepository {

    public void insertDetailData(Movie movie);

}
