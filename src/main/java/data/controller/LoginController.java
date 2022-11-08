package data.controller;

import data.repository.UserRepository;
import data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    UserService userService;

    @PostMapping("/check")
    public Map<String, Object> selectLogin (@RequestBody Map<String, String> map) {
        System.out.println(map);
        return userService.selectLogin(map);
    }
}
