package data.repository;

import data.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserRepository {
    public int selectLogin (Map<String, String> map); //로그인
    public String selectName (String u_id); //로그인 시 이름 가져오기
    public int selectPwUdtDate (Map<String, String> map); //로그인 시 비밀번호 변경 후 지난 기간 불러오기
    public int searchId (String u_id); //회원가입 아이디 중복 체크
    public void insertUser (User user); //회원가입
    public int selectPk (String u_id); //로그인 시 pk 가져오기
    public String selectPass (String u_id); //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(입력한 비밀번호와 일치하는 지 확인용)
    public void updatePass (Map<String, String> map); //비밀번호 변경
    public void deleteUser (String u_id); //회원 삭제 (상태 변경)
    public void updatePassDate (String u_pk); //비밀번호 안바꿔도 날짜 업데이트
}
