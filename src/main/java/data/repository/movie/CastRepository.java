package data.repository.movie;

import data.domain.movie.Cast;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface CastRepository {

    public void insertCast(Cast cast);              // // TMDB - 정보 저장

}
