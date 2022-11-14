package data.repository.movie;

import data.domain.movie.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MovieRepository {

    public void insertDetailData(Movie movie);

    public void updatePhoto(Map<String, Object> map);

}
