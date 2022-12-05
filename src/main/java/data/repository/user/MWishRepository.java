package data.repository.user;

import data.domain.user.MWish;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MWishRepository {

    public void isnertMWish(MWish mWish);

    public void deleteMWish(MWish mWish);

    public int selectWishCnt(int movie_pk);        // 영화 좋아요 갯수 출력

    public boolean mWishYorN(Map<String, Object> map);      // 해당영화 좋아요 선택 유무 판단

    public List<Integer> selectMWishList(int user_pk);      // 유저가 좋아요한 영화 리스트 반환
}
