package data.repository;

import data.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserRepository {
    public int selectLogin (Map<String, String> map); //로그인
    public String selectName (String u_id); //로그인 시 이름 가져오기
    public void insertUser (User user); //회원가입
}
