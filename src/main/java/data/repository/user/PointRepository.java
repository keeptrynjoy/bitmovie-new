package data.repository.user;

import data.domain.user.Point;
import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointRepository {
    public int selectPointByUser(int user_pk);
    public void insertPointData(Point point);
    public int selectPoint (int user_pk); //유저 보유 포인트 조회
    public void updatePoint (Point point); //유저 보유 포인트 갱신
    public int selectPointByPayment(String payment_pk);

}
