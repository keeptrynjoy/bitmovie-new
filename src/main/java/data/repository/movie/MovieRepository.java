package data.repository.movie;

import data.domain.movie.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MovieRepository {

    public void insertDetailData(Movie movie);

    public Movie selectMovieData(int movie_pk);

    public int selectMovieYoN(String movie_pk);

    public void updateDataOne(Map<String, Object> map);

    public List<Movie> selectTotalMovie();

    public int selectIngOrNot(Map<String, Object> map);         // 검색 - 영화 상영중인지 여부 확인

    public int selectComingorNot(Map<String, Object> map);      // 검색 - 영화 상영예정인지 여부 확인
}

