package data.repository.user;

import data.domain.user.MWish;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MWishRepository {

    public void isnertMWish(MWish mWish);

    public void deleteMWish(MWish mWish);

    public int selectWishCnt(int movie_pk);        // 영화 좋아요 갯수 출력
}
