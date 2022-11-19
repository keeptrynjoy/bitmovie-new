package data.controller.user;

import data.domain.user.LikeRevw;
import data.domain.user.MWish;
import data.domain.user.Report;
import data.domain.user.User;
import data.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    //회원가입 아이디 중복 체크
    @GetMapping("/idcheck")
    public int searchId(String u_id) {
        return userService.searchId(u_id); //아이디가 있으면 1 반환, 없으면 0 반환
    }

    //회원가입
    @PostMapping("/insert")
    public void insertUser(@RequestBody User user) {
        System.out.println(user);
        userService.insertUser(user);
    }

    //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(기존 비밀번호와 일치하면 비밀번호 변경불가)
    @PostMapping("/selectpass")
    public boolean selectPass(@RequestBody User user) {
        return userService.selectPass(user);
    }

    //비밀번호 변경
    @PostMapping("/updatepass")
    public void updatePass(@RequestBody Map<String, String> map) {
        userService.updatePass(map);
    }

    //회원 삭제(상태 변경)
    @GetMapping("/delete")
    public void deleteUser(String u_id) {
        userService.deleteUser(u_id);
    }

    //아이디 찾기
    @GetMapping("/findid")
    public String selectFindId(String u_phone) {
        return userService.selectId(u_phone);
    }

    //비밀번호 찾기(아이디, 핸드폰 번호 넘겨서 둘 다 일치하는 레코드 있으면 1, 없으면 0 넘겨줌)
    @GetMapping("/findpass")
    public int selectFindPass(@RequestParam Map<String, String> map) {
        return userService.selectFindPass(map);
    }

    // 영화 평점 등록
    @GetMapping("/insertReview")
    public void insertReview(String movie_pk, String user_pk, String revw_star,
                             @RequestParam(defaultValue = "") String revw_text) {
        System.out.println(movie_pk);
        System.out.println(user_pk);
        System.out.println(revw_star);
        System.out.println(revw_text);
        userService.insertReview(movie_pk, user_pk, revw_star, revw_text);

    }

    // 영화 평점 수정
    @GetMapping("/updateReview")
    public void updateReview(String review_pk, String revw_star, String revw_text) {
        userService.updateReview(review_pk, revw_star, revw_star);
    }

    // 영화 평점 삭제
    @GetMapping("/deleteReview")
    public void deleteReview(String review_pk) {
        userService.deleteReview(review_pk);
    }

    // 평점 좋아요
    @GetMapping("/insertLikeRevw")
    public void insertLikeRevw(@RequestBody LikeRevw likeRevw) {
        userService.insertLikeRevw(likeRevw);
    }

    // 평점 좋아요 취소
    @GetMapping("/deleteLikeRevw")
    public void deleteLikeRevw(@RequestBody LikeRevw likeRevw) {
        userService.deleteLikeRevw(likeRevw);
    }

    // 평점 신고하기
    @GetMapping("/insertReport")
    public void insertReport(@RequestBody Report report) {
        userService.insertReport(report);
    }

    // 평점 신고 취소하기
    @GetMapping("/deleteReport")
    public void deleteReport(@RequestBody Report report) {
        userService.deleteReport(report);
    }

    // 영화 좋아요
    @GetMapping("/insertMWish")
    public void insertMWish(@RequestBody MWish mWish) {
        userService.isnertMWish(mWish);
    }

    // 영화 좋아요 취소
    @GetMapping("/deleteMWish")
    public void deleteMWish(@RequestBody MWish mWish) {
        userService.deleteMWish(mWish);
    }
}
