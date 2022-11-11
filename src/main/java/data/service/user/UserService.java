package data.service.user;

import data.domain.user.User;
import data.repository.user.UserRepository;
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
        int u_pk = 0;
        int pwUdtDate = 0;
        String u_name = "";
        if (yesOrNo == 1) {
            u_pk = userRepository.selectPk(map.get("u_id"));
            u_name = userRepository.selectName(map.get("u_id")); //로그인 성공하면 이름 가져오기
            pwUdtDate = userRepository.selectPwUdtDate(map); //로그인 성공하면 비밀번호 변경 후 지난 기간 가져오기
        }

        Map<String, Object> sendMap = new HashMap<>();
        sendMap.put("yesOrNo", yesOrNo);
        sendMap.put("u_name", u_name);
        sendMap.put("pwUdtDate", pwUdtDate);
        sendMap.put("u_pk",u_pk);

        return sendMap;
    }

    //회원가입 아이디 중복 체크
    public int searchId (String u_id) {
        return userRepository.searchId(u_id);
    }
    //회원가입
    public void insertUser (@RequestBody User user) {
        userRepository.insertUser(user);
    }
    //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(입력한 비밀번호와 일치하는 지 확인용)
    public boolean selectPass (String u_id, String u_pass) {
        String pass = userRepository.selectPass(u_id);
        boolean check = false;
        if (pass == u_pass) {
            check = true;
        }
        return check;
    }
    //비밀번호 변경
    public void updatePass (Map<String, String> map) { userRepository.updatePass(map); }
    //회원 삭제(상태 변경)
    public void deleteUser (String u_id) {
        userRepository.deleteUser(u_id);
    }
    //비밀번호 안바꿔도 날짜 업데이트
    public void updatePassDate(String u_id) { userRepository.updatePassDate(u_id); }
}
