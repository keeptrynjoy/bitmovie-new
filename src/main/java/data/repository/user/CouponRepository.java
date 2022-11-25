package data.repository.user;

import data.domain.user.Coupon;
import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Mapper
public interface CouponRepository {
    public List<User> selectBirthUser(); //생일인 회원키 조회
    public void insertBirthCoupon (Coupon coupon); //생일 쿠폰 생성
    public int selectCouponNumber (String coupon_pk); //쿠폰번호 중복 조회(없으면 0, 있으면 1)
    public void updateCouponState (); //쿠폰 사용기간 만료되면 사용불가
    public int selectUserKey (); //회원가입 후 유저키 조회
    public void insertJoinCoupon (Coupon coupon); //가입 쿠폰 생성
    public Coupon selectCoupon (int user_pk); // 쿠폰 조회
    public Coupon selectCouponState(String coupon_pk);

    public void updateCouponByPayment(Map<String, Object> map);
}
