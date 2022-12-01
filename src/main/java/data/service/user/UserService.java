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

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final LikeRevwRepository likeRevwRepository;
    private final ReportRepository reportRepository;
    private final MWishRepository mWishRepository;

    //유저 정보 출력
    public User selectUser(int user_pk) {
        return userRepository.selectUser(user_pk);
    }
    //회원 정보 수정
    public void updateUser(User user) {
        userRepository.updateUser(user);
    }
    //회원가입 아이디 중복 체크
    public int searchId(String u_id) {
        return userRepository.searchId(u_id);
    }
    //회원가입
    public void insertUser(User user) {
        userRepository.insertUser(user);
    }
    public int selectNickname(String u_nick) {
        return userRepository.selectNickname(u_nick);
    }
    //본인 인증
    public void certifiedPhoneNumber(String u_phone, String cerNum) {
        String api_key = "NCSOX3D8XBNLOEGI";
        String api_secret = "XS5PNYO2EUDRLMH3I7NMVV478Z62KPRZ";
        Message coolsms = new Message(api_key, api_secret);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", u_phone); // 수신전화번호
        params.put("from", "010-8685-9930"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", "[BitMovie] 문자 본인인증 서비스 : 인증번호는 " + "[" + cerNum + "]" + " 입니다.");
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
    public boolean selectPass(User user) {
        String pass = userRepository.selectPass(user);
        boolean check = false;
        if (pass.equals(user.getU_pass())) {
            check = true;
        }
        return check;
    }
    //비밀번호 변경
    public void updatePass(User user) {
        userRepository.updatePass(user);
    }
    //회원 삭제(상태 변경)
    public void deleteUser(String u_id) {
        userRepository.deleteUser(u_id);
    }
    //아이디 찾기
    public String selectId(String u_phone) {
        String id = userRepository.selectFindId(u_phone);
        if (id != null){
            String resultId = id.substring(0,2) + "**" + id.substring(4);
            return resultId;
        } else {
            return "일치하는 회원 정보가 없습니다.";
        }
    }
    //비밀번호 찾기 (아이디, 핸드폰 번호 확인)
    public int selectFindPass(User user) {
        return userRepository.selectFindPass(user);
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

    // 평점 신고 유무 확인
    public boolean selectReportYorN(Report report) {
        int yorN = reportRepository.selectReportYorN(report);
        return yorN==1?true:false;
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
