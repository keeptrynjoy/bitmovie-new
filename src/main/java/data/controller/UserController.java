package data.controller;

import data.domain.User;
import data.repository.UserRepository;
import data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    //회원가입
    @PostMapping("/insert")
    public void insertUser (User user) {
        userService.insertUser(user);
    }
}
