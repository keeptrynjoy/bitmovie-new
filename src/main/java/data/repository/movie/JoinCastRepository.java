package data.repository.movie;

import data.domain.movie.JoinCast;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinCastRepository {

    public List<JoinCast> selectCastByMovie(int movie_pk);      // 등장 인물 정보 출력
    public List<JoinCast> selectCastDetail(int person_pk);      // 인물 상세 정보 출력
}
