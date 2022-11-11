package data.controller;

import data.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    UserService userService;

    //로그인 (id, password 확인 후)
    @PostMapping("/check")
    public Map<String, Object> selectLogin (@RequestBody Map<String, String> map) {
        return userService.selectLogin(map);
    }
}
