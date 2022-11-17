package data.controller.user;

import data.domain.user.MyPage;
import data.domain.user.User;
import data.service.user.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public void updatePoint (Map<String, Object> map) {
        myPageService.updatePoint(map);
    }
}
