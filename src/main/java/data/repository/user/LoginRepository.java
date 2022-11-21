package data.repository.user;

import data.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginRepository {
    public int selectLogin (User user); //로그인
    public int selectPk (String u_id); //로그인 시 pk 가져오기
    public String selectName (String u_id); //로그인 시 이름 가져오기
    public int selectPwUdtDate (User user); //로그인 시 비밀번호 변경 후 지난 기간 불러오기
    public void updatePassDate (String u_id); //비밀번호 안바꿔도 날짜 업데이트
}
