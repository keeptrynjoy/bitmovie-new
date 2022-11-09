package data.service;

import data.domain.User;
import data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    //로그인 (id, password 체크)
    public Map<String, Object> selectLogin (@RequestBody Map<String, String> map) {
        int yesOrNo = userRepository.selectLogin(map);

        String u_name = "";
        if (yesOrNo == 1) {
            u_name = userRepository.selectName(map.get("u_id")); //로그인 성공하면 이름 가져오기
        }

        Map<String, Object> sendMap = new HashMap<>();
        sendMap.put("yesOrNo", yesOrNo);
        sendMap.put("u_name", u_name);

        return sendMap;
    }

    //회원가입
    public void insertUser (@RequestBody User user) {
        userRepository.insertUser(user);
    }
}
