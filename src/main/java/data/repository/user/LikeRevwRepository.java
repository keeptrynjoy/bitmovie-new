package data.repository.user;


import data.domain.movie.JoinRevw;
import data.domain.user.LikeRevw;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface LikeRevwRepository {

    public void insertLikeRevw(LikeRevw likeRevw);      // 평점 좋아요

    public void deleteLikeRevw(LikeRevw likeRevw);      // 평점 좋아요 취소

    public boolean likeYorN(JoinRevw joinRevw);     // 평점 좋아요 여부 확인

}
