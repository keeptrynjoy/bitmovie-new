package data.controller.user;

import data.domain.user.User;
import data.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    //회원가입 아이디 중복 체크
    @GetMapping("/idcheck")
    public int searchId(@RequestParam String u_id) {
        return userService.searchId(u_id); //아이디가 있으면 1 반환, 없으면 0 반환
    }
    //회원가입
    @PostMapping("/insert")
    public void insertUser (@RequestBody User user) {
        userService.insertUser(user);
    }
    //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(입력한 비밀번호와 일치하는 지 확인용)
    @PostMapping("/selectpass")
    public boolean selectPass (String u_id, String u_pass) {
        return userService.selectPass(u_id, u_pass);
    }
    //비밀번호 변경
    @PostMapping("/updatepass")
    public void updatePass (Map<String, String> map) {
        userService.updatePass(map);
    }
    //회원 삭제(상태 변경)
    @PostMapping("/delete")
    public void deleteUser (String u_id) {
        userService.deleteUser(u_id);
    }
    //아이디 찾기
    @GetMapping("/findid")
    public String selectFindId (String u_phone) {
        return userService.selectId(u_phone);
    }
    //비밀번호 찾기(아이디, 핸드폰 번호 넘겨서 둘 다 일치하는 레코드 있으면 1, 없으면 0 넘겨줌)
    @GetMapping("/findpass")
    public int selectFindPass (@RequestParam Map<String, String> map) {
        System.out.println(map);
        return userService.selectFindPass(map);
    }
    //마이페이지 유저 정보 출력
    @GetMapping("/information")
    public User selectUser (String user_pk) {
        return userService.selectUser(user_pk);
    }
    //마이페이지 회원 정보 수정
    @PostMapping("/update")
    public void updateUser (User user) {
        userService.updateUser(user);
    }
    //마이페이지 예매 목록 조회
    @GetMapping("/bookinglist")
    public Map<String, Object> selectBooking (String user_pk) {
        return userService.selectBooking(user_pk);
    }
    //마이페이지 무비로그 조회
    @GetMapping("/movielog")
    public Map<String, Object> selectMovieLog (String user_pk) {
        return userService.selectMovieLog(user_pk);
    }
    //마이페이지 포인트 조회
    @GetMapping("/point")
    public int selectPoint (String user_pk) {
        return userService.selectPoint(user_pk);
    }
}
