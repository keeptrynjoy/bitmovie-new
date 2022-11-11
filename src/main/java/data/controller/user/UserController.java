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
    @GetMapping("/selectpass")
    public boolean selectPass (String u_id, String u_pass) {
        return userService.selectPass(u_id, u_pass);
    }
    //비밀번호 변경
    @PostMapping("/updatepass")
    public void updatePass (Map<String, String> map) { userService.updatePass(map); }
    //회원 삭제(상태 변경)
    @PostMapping("/delete")
    public void deleteUser (String u_id) {
        userService.deleteUser(u_id);
    }
}
