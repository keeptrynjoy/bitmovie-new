package data.controller.user;

import data.domain.user.Coupon;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import data.service.user.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    //마이페이지 유저 정보 출력
    @GetMapping("/information")
    public User selectUser (int user_pk) {
        return myPageService.selectUser(user_pk);
    }
    //마이페이지 회원 정보 수정
    @PostMapping("/update")
    public void updateUser (@RequestBody User user) {
        myPageService.updateUser(user);
    }
    //마이페이지 예매 목록 조회
    @GetMapping("/bookinglist")
    public List<MyPage> selectBooking (int user_pk) {
        return myPageService.selectBooking(user_pk);
    }
    //마이페이지 무비로그 조회
    @GetMapping("/movielog")
    public List<MyPage> selectMovieLog (int user_pk) {
        return myPageService.selectMovieLog(user_pk);
    }
    //마이페이지 포인트 조회
    @GetMapping("/point")
    public int selectPoint (int user_pk) {
        return myPageService.selectPoint(user_pk);
    }
    //마이페이지 포인트 적립/소멸 조회
    @GetMapping("/pointdetail")
    public List<MyPage> selectPointDetail (int user_pk) {
        return myPageService.selectPointDetail(user_pk);
    }
    //마이페이지 포인트 갱신
    @GetMapping("/updatePoint")
    public void updatePoint (Point point) {
        myPageService.updatePoint(point);
    }
    //마이페이지 사용가능 쿠폰 개수 조회
    @GetMapping("/mycouponcount")
    public int selectMyCouponCount (int user_pk) {
        return myPageService.selectMyCouponCount(user_pk);
    }
    //마이페이지 사용가능 쿠폰 조회
    @GetMapping("/mycoupondetail")
    public List<Coupon> selectMyCouponDetail (int user_pk) {
        return myPageService.selectMyCouponDetail(user_pk);
    }
    //마이페이지 만료예정 쿠폰 개수 조회
    @GetMapping("/expcoupon")
    public int selectExpCoupon (int user_pk) {
        return myPageService.selectExpCoupon(user_pk);
    }
    //마이페이지 쿠폰 발급/사용 내역 조회
    @GetMapping("/coupondetail")
    public List<Coupon> selectCouponDetail (int user_pk) {
        return myPageService.selectCouponDetail(user_pk);
    }
    //프로필 사진 업로드
    @GetMapping("/uploadphoto")
    public void updateUserPhoto (User user, MultipartFile photoFile, HttpServletRequest request) {
        myPageService.updateUserPhoto(user, photoFile, request);
    }
}
