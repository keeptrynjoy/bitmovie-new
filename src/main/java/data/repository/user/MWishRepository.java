package data.repository.user;

import data.domain.user.MWish;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MWishRepository {

    public void isnertMWish(MWish mWish);

    public void deleteMWish(MWish mWish);
}
