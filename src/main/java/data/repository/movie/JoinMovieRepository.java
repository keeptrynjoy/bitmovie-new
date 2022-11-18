package data.repository.movie;

import data.domain.movie.JoinMovie;
import org.apache.ibatis.annotations.Mapper;
import org.hibernate.mapping.Join;

import java.util.List;
import java.util.Map;

@Mapper
public interface JoinMovieRepository {

    public List<JoinMovie> selectMovieList(Map<String, String> map);    // 영화 리스트 출력

    public List<JoinMovie> selectSearchMovie(String search);        // 메인화면에서 검색 - 영화 출력


}
