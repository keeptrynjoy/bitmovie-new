package data.service.user;

import data.domain.user.User;
import data.repository.user.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;

    //로그인 (id, password 체크)
    public User selectLogin (User user) {
        int loginOk = loginRepository.selectLogin(user);
        int user_pk = 0;
        int u_passDateDiff = 0;
        String u_name = "";
        if (loginOk == 1) {
            user_pk = loginRepository.selectPk(user.getU_id()); //로그인 시 PK 가져오기
            u_name = loginRepository.selectName(user.getU_id()); //로그인 성공하면 이름 가져오기
            u_passDateDiff = loginRepository.selectPwUdtDate(user); //로그인 성공하면 비밀번호 변경 후 지난 기간 가져오기
        }
        System.out.println(u_passDateDiff);
        User userDto = new User();
        userDto.setLoginOk(loginOk);
        userDto.setU_name(u_name);
        userDto.setU_passDateDiff(u_passDateDiff);
        userDto.setUser_pk(user_pk);
        return userDto;
    }
    //비밀번호 안바꿔도 날짜 업데이트
    public void updatePassDate (String u_id) {
        loginRepository.updatePassDate(u_id);
    }
}
