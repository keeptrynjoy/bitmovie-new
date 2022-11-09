package data.service;

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

    public Map<String, Object> selectLogin (@RequestBody Map<String, String> map) {
        int yesOrNo = userRepository.selectLogin(map);

        String u_name = "";
        if (yesOrNo == 1) {
            u_name = userRepository.selectName(map.get("u_id"));
        }

        Map<String, Object> sendMap = new HashMap<>();
        sendMap.put("yesOrNo", yesOrNo);
        sendMap.put("u_name", u_name);
        System.out.println("sendMap: "+sendMap);
        return sendMap;
    }
}
