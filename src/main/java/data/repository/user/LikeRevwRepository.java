package data.repository.user;


import data.domain.movie.JoinRevw;
import data.domain.user.RevwClick;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LikeRevwRepository {

    public void insertLikeRevw(RevwClick revwClick);      // 평점 좋아요

    public void deleteLikeRevw(RevwClick revwClick);      // 평점 좋아요 취소

    public boolean likeYorN(Map<String, Integer> map);     // 평점 좋아요 여부 확인

    public List<Integer> LikeRevwList(Map<String, Integer> map);    // 평점 좋아요 리스트 출력

}
