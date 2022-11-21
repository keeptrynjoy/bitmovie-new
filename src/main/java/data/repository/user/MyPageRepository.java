package data.repository.user;

import data.domain.user.Coupon;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MyPageRepository {
    public User selectUser (int user_pk); //마이페이지 유저 정보 출력
    public void updateUser (User user); //마이페이지 회원 정보 수정
    public List<MyPage> selectBooking (int user_pk); //마이페이지 예매 목록 조회
    public List<MyPage> selectMovieLog (int user_pk); //마이페이지 무비로그 조회
    public int selectPoint (int user_pk); //마이페이지 포인트 조회
    public List<MyPage> selectPointDetail (int user_pk); //마이페이지 포인트 적립/소멸 조회
    public void updatePoint (Point point); //마이페이지 포인트 갱신
    public int selectMyCouponCount (int user_pk); //마이페이지 사용가능 쿠폰 개수 조회
    public List<Coupon> selectMyCouponDetail (int user_pk); //마이페이지 사용가능 쿠폰 조회
    public int selectExpCoupon (int user_pk); //마이페이지 만료예정 쿠폰 개수 조회
    public List<Coupon> selectCouponDetail (int user_pk); //마이페이지 쿠폰 발급/사용 내역 조회
}
