package data.service.user;

import data.domain.user.Coupon;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import data.repository.user.MyPageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    //마이페이지 유저 정보 출력
    public User selectUser (int user_pk) {
        return myPageRepository.selectUser(user_pk);
    }
    //마이페이지 회원 정보 수정
    public void updateUser (User user) {
        myPageRepository.updateUser(user);
    }
    //마이페이지 예매 목록 조회
    public List<MyPage> selectBooking (int user_pk) {
        return myPageRepository.selectBooking(user_pk);
    }
    //마이페이지 무비로그 조회
    public List<MyPage> selectMovieLog (int user_pk) {
        return myPageRepository.selectMovieLog(user_pk);
    }
    //마이페이지 포인트 조회
    public int selectPoint (int user_pk) {
        return myPageRepository.selectPoint(user_pk);
    }
    //마이페이지 포인트 적립/소멸 조회
    public List<MyPage> selectPointDetail (int user_pk) {
        return myPageRepository.selectPointDetail(user_pk);
    }
    //마이페이지 포인트 갱신
    public void updatePoint (Point point) {
        myPageRepository.updatePoint(point);
    }
    //마이페이지 쿠폰 개수 조회
    public int selectMyCouponCount (int user_pk) {
        return myPageRepository.selectMyCouponCount(user_pk);
    }
    //마이페이지 사용가능쿠폰 조회
    public List<Coupon> selectMyCouponDetail (int user_pk) {
        return myPageRepository.selectMyCouponDetail(user_pk);
    }
}
