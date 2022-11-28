package data.controller.user;

import data.domain.user.Coupon;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import data.service.user.CouponService;
import data.service.user.MyPageService;
import data.service.user.PointService;
import data.service.user.UserService;
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
    private final PointService pointService;
    private final CouponService couponService;
    private final UserService userService;


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
        return pointService.selectPoint(user_pk);
    }
    //마이페이지 포인트 적립/소멸 조회
    @GetMapping("/pointdetail")
    public List<MyPage> selectPointDetail (int user_pk) {
        return myPageService.selectPointDetail(user_pk);
    }
    //마이페이지 포인트 갱신
    @GetMapping("/updatePoint")
    public void updatePoint (Point point) {
        pointService.updatePoint(point);
    }
    //마이페이지 사용가능 쿠폰 개수 조회
    @GetMapping("/mycouponcount")
    public int selectMyCouponCount (int user_pk) {
        return couponService.selectMyCouponCount(user_pk);
    }
    //마이페이지 사용가능 쿠폰 조회
    @GetMapping("/mycoupondetail")
    public List<Coupon> selectMyCouponDetail (int user_pk) {
        return couponService.selectMyCouponDetail(user_pk);
    }
    //마이페이지 만료예정 쿠폰 개수 조회
    @GetMapping("/expcoupon")
    public int selectExpCoupon (int user_pk) {
        return couponService.selectExpCoupon(user_pk);
    }
    //마이페이지 쿠폰 발급/사용 내역 조회
    @GetMapping("/coupondetail")
    public List<Coupon> selectCouponDetail (int user_pk) {
        return couponService.selectCouponDetail(user_pk);
    }
    //프로필 사진 업로드
    @PostMapping("/uploadphoto")
    public void updateUserPhoto (int user_pk, MultipartFile photoFile, HttpServletRequest request) {
        User user = userService.selectUser(user_pk);
        myPageService.updateUserPhoto(user, photoFile, request);
    }
}