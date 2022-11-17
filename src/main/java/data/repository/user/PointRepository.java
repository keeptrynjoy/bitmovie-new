package data.repository.user;

import data.domain.user.Point;
import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointRepository {
    public int selectPointByUser(int user_pk);

    public void insertPointData(Point point);
}
