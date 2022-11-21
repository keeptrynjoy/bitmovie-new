package data.repository.movie;

import data.domain.movie.JoinRevw;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinRevwRepository {
    public List<JoinRevw> selectJoinRevw(int movie_pk);     // 해당 영화의 평점 정보 출력

    public List<JoinRevw> selectRecentRevw(int count);      // 가장 최신 등록된 평점을 'count'갯수 만큼 반환


}
