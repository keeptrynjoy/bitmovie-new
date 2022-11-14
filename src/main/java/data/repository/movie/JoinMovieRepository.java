package data.repository.movie;

import data.domain.movie.JoinMovie;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JoinMovieRepository {

    public JoinMovie selectMovieList();

}
