package data.repository.user;


import data.domain.movie.JoinRevw;
import data.domain.user.RevwClick;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface LikeRevwRepository {

    public void insertLikeRevw(RevwClick revwClick);      // 평점 좋아요

    public void deleteLikeRevw(RevwClick revwClick);      // 평점 좋아요 취소

    public boolean likeYorN(JoinRevw joinRevw);     // 평점 좋아요 여부 확인

}
