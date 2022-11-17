package data.repository.movie;

import data.domain.movie.JoinRevw;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinRevwRepository {
    public List<JoinRevw> selectJoinRevw(String movie_pk);     // 해당 영화의 평점 정보 출력
}
