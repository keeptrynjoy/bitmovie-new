package data.repository.movie;

import data.domain.movie.Cast;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
public interface CastRepository {

    // TMDB - 정보 저장
    void insertCast(Cast cast);

}
