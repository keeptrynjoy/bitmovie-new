package data.controller;

import data.domain.User;
import data.repository.UserRepository;
import data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void insertUser (User user) {
        userService.insertUser(user);
    }
}
