package data.controller.user;

import data.domain.user.User;
import data.service.user.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    LoginService loginService;
    //로그인 (id, password 확인 후)
    @PostMapping("/check")
    public User selectLogin(@RequestBody User user) {
        return loginService.selectLogin(user);
    }
    //비번 안바꿔도 업뎃햇다고 하기
    @GetMapping("/updatepassdate")
    public void updatePassDate(String u_id) {
        loginService.updatePassDate(u_id);}
}
