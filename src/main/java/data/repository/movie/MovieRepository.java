package data.repository.movie;

import data.domain.movie.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MovieRepository {

    public void insertDetailData(Movie movie);

    public Movie selectMovieData(String movie_pk);

    public int selectMovieYoN(String movie_pk);

    public void updateDataOne(Map<String, Object> map);
}
