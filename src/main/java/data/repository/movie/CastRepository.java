package data.repository.movie;

import data.domain.movie.Cast;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface CastRepository {

    public void insertCast(Cast cast);              // // TMDB - 정보 저장
    public List<Cast> selectCastList(String movie_pk);     // 등장인물 정보 반환 - 영화 상세 페이지

}
