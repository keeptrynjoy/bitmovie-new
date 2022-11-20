package data.service.user;

import data.domain.user.*;
import data.domain.movie.Review;
import data.repository.movie.ReviewRepository;
import data.repository.user.*;
import lombok.RequiredArgsConstructor;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final LikeRevwRepository likeRevwRepository;
    private final ReportRepository reportRepository;
    private final MWishRepository mWishRepository;
    //로그인 (id, password 체크)
    public Map<String, Object> selectLogin (Map<String, String> map) {
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
    public void insertUser (User user) {
        userRepository.insertUser(user);
    }
    //회원가입 시 본인 인증
    public void certifiedPhoneNumber(String phoneNumber, String cerNum) {

        String api_key = "NCSOX3D8XBNLOEGI";
        String api_secret = "XS5PNYO2EUDRLMH3I7NMVV478Z62KPRZ";
        Message coolsms = new Message(api_key, api_secret);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);    // 수신전화번호
        params.put("from", "01086859930");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", "핫띵크 휴대폰인증 테스트 메시지 : 인증번호는" + "["+cerNum+"]" + "입니다.");
        params.put("app_version", "test app 1.2"); // application name and version

        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }

    }
    //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(기존 비밀번호와 일치하면 비밀번호 변경불가)
    public boolean selectPass (User user) {
        String pass = userRepository.selectPass(user);
        boolean check = false;
        if (pass.equals(user.getU_pass())) {
            check = true;
        }
        return check;
    }
    //비밀번호 변경
    public void updatePass (Map<String, String> map) {
        userRepository.updatePass(map);
    }
    //회원 삭제(상태 변경)
    public void deleteUser (String u_id) {
        userRepository.deleteUser(u_id);
    }
    //비밀번호 안바꿔도 날짜 업데이트
    public void updatePassDate (String u_id) {
        userRepository.updatePassDate(u_id);
    }
    //아이디 찾기
    public String selectId (String u_phone) {
        String id = userRepository.selectFindId(u_phone);
        String resultId = id.substring(0,2) + "**" + id.substring(4);
        return resultId;
    }
    //비밀번호 찾기 (아이디, 핸드폰 번호 확인)
    public int selectFindPass (Map<String, String> map) {
        return userRepository.selectFindPass(map);
    }

    // 영화 평점 등록
    public void insertReview(String movie_pk, String user_pk, String revw_star, String revw_text) {

        reviewRepository.insertReview(
                Review.reviewBuilder()
                        .movie_pk(Integer.parseInt(movie_pk))
                        .user_pk(Integer.parseInt(user_pk))
                        .revw_star(Float.parseFloat(revw_star))
                        .revw_text(revw_text)
                        .build()

        );

    }

    // 영화 평점 수정
    public void updateReview(String review_pk, String revw_star, String revw_text) {

        reviewRepository.updateReview(
                Review.reviewBuilder()
                        .review_pk(Integer.parseInt(review_pk))
                        .revw_star(Float.parseFloat(revw_star))
                        .revw_text(revw_text)
                        .build()
        );
    }

    // 영화 평점 삭제
    public void deleteReview(String review_pk) {
        reviewRepository.deleteReview(review_pk);
    }

    // 평점 좋아요
    public void insertLikeRevw(LikeRevw likeRevw){
        likeRevwRepository.insertLikeRevw(likeRevw);
    }

    // 평점 좋아요 취소
    public void deleteLikeRevw(LikeRevw likeRevw){
        likeRevwRepository.deleteLikeRevw(likeRevw);
    }

    // 평점 신고하기
    public void insertReport(Report report) {
        reportRepository.insertReport(report);
    }

    // 평점 신고 취소하기
    public void deleteReport(Report report) {
        reportRepository.deleteReport(report);
    }

    // 영화 좋아요 기능
    public void isnertMWish(MWish mWish) {
        mWishRepository.isnertMWish(mWish);
    }

    // 영화 좋아요 취소
    public void deleteMWish(MWish mWish) {
        mWishRepository.deleteMWish(mWish);
    }
}
