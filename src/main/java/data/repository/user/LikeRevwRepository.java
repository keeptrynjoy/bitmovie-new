package data.repository.user;


import data.domain.movie.LikeRevw;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeRevwRepository {

    public void insertLikeRevw(LikeRevw likeRevw);      // 평점 좋아요

    public void deleteLikeRevw(LikeRevw likeRevw);      // 평점 좋아요 취소
}
