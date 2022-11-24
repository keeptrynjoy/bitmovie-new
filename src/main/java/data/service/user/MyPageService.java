package data.service.user;

import data.domain.user.Coupon;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import data.repository.user.MyPageRepository;
import data.util.ChangeName;
import data.util.DeletePhotoFile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    //마이페이지 유저 정보 출력
    public User selectUser (int user_pk) {
        return myPageRepository.selectUser(user_pk);
    }
    //마이페이지 회원 정보 수정
    public void updateUser (User user) {
        myPageRepository.updateUser(user);
    }
    //마이페이지 예매 목록 조회
    public List<MyPage> selectBooking (int user_pk) {
        return myPageRepository.selectBooking(user_pk);
    }
    //마이페이지 무비로그 조회
    public List<MyPage> selectMovieLog (int user_pk) {
        return myPageRepository.selectMovieLog(user_pk);
    }
    //마이페이지 포인트 조회
    public int selectPoint (int user_pk) {
        return myPageRepository.selectPoint(user_pk);
    }
    //마이페이지 포인트 적립/소멸 조회
    public List<MyPage> selectPointDetail (int user_pk) {
        return myPageRepository.selectPointDetail(user_pk);
    }
    //마이페이지 포인트 갱신
    public void updatePoint (Point point) {
        myPageRepository.updatePoint(point);
    }
    //마이페이지 사용가능 쿠폰 개수 조회
    public int selectMyCouponCount (int user_pk) {
        return myPageRepository.selectMyCouponCount(user_pk);
    }
    //마이페이지 사용가능 쿠폰 조회
    public List<Coupon> selectMyCouponDetail (int user_pk) {
        return myPageRepository.selectMyCouponDetail(user_pk);
    }
    //마이페이지 만료예정 쿠폰 개수 조회
    public int selectExpCoupon (int user_pk) {
        return myPageRepository.selectExpCoupon(user_pk);
    }
    //마이페이지 쿠폰 발급/사용 내역 조회
    public List<Coupon> selectCouponDetail (int user_pk) {
        return myPageRepository.selectCouponDetail(user_pk);
    }
    //프로필 사진 업로드
    public void updateUserPhoto (User user, MultipartFile photoFile, HttpServletRequest request) {

        String path = request.getSession().getServletContext().getRealPath("/image");
        String photoName = photoFile.getOriginalFilename();
        if( photoName.equals("")) {
            user.setU_photo("noimage.png");
        } else {
            try {
                String original = myPageRepository.selectPhotoName(user);
                DeletePhotoFile.deletePhotoFile(path, original);
                photoName = ChangeName.changeFileName(photoName);
                photoFile.transferTo(new File(path + "/" + photoName));
                user.setU_photo(photoName);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        myPageRepository.updateUserPhoto(user);
    }
}
