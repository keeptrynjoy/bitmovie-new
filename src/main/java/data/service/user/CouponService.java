package data.service.user;

import data.domain.user.Coupon;
import data.domain.user.User;
import data.repository.user.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;
    //생일 쿠폰 생성
    public void insertBirthCoupon () {
        //user_pk 담긴 list 생성
        List<User> userList = couponRepository.selectBirthUser();
        final char[] possibleCharacters =
                {'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        final int possibleCharacterCount = possibleCharacters.length;
        Random rnd = new Random();
        int currentIndex = 0;
        while (currentIndex < userList.size()) { //list 에 담긴 회원수만큼 반복 쿠폰 생성
            StringBuffer buf = new StringBuffer(20);
            for (int i=0; i<8; i++) { //8자리 난수 생성
                buf.append(possibleCharacters[rnd.nextInt(possibleCharacterCount)]);
            }
            //쿠폰번호 3번째 자리부터 현재 년도 2자리 넣기
            LocalDate now = LocalDate.now();
            String fullYear = Integer.toString(now.getYear());
            String year = fullYear.substring(2,4);
            buf.insert(2, year);
            //쿠폰 번호에 쿠폰타입 마지막에 넣어주기
            buf.append("B"); //생일쿠폰을 의미
            String coupon_pk = buf.toString(); //생성한 쿠폰번호를 coupon_pk 로 초기화
            int overlap = couponRepository.selectCouponNumber(coupon_pk); //쿠폰번호 중복 조회(있으면 1 반환)
            if(overlap == 0) { //중복된 번호 없으면 생성된 쿠폰값 넣기 (있으면 다시 생성)
                User user = userList.get(currentIndex); //List 형태로 가져온 dto 반복문 돌릴 때마다 펼치기
                int user_pk = user.getUser_pk(); //펼친 dto 에서 user_pk 꺼내오기

                Coupon coupon = new Coupon(); //다시 보낼 Coupon 객체 생성
                coupon.setCoupon_pk(coupon_pk); //쿠폰번호 담기
                coupon.setUser_pk(user_pk); //user_pk 담기

                couponRepository.insertBirthCoupon(coupon); //생일인 회원에게 생성된 쿠폰 넣기
                currentIndex++;
            }
        }
    }
    //쿠폰 사용기간 만료되면 사용불가
    public void updateCouponState () {
        couponRepository.updateCouponState();
    }
    //가입 쿠폰 생성
    public void insertJoinCoupon () {
        int user_pk = couponRepository.selectUserKey(); //가장 최근에 생성된 회원키 찾아옴
        final char[] possibleCharacters =
                {'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        final int possibleCharacterCount = possibleCharacters.length;
        Random rnd = new Random();
        StringBuffer buf = new StringBuffer(20);
        for (int i=0; i<8; i++) { //8자리 난수 생성
            buf.append(possibleCharacters[rnd.nextInt(possibleCharacterCount)]);
        }

        //쿠폰번호 3번째 자리부터 현재 년도 2자리 넣기
        LocalDate now = LocalDate.now();
        String fullYear = Integer.toString(now.getYear());
        String year = fullYear.substring(2,4);
        buf.insert(2, year);
        //쿠폰 번호에 쿠폰타입 마지막에 넣어주기
        buf.append("J"); //가입쿠폰을 의미
        String coupon_pk = buf.toString(); //생성한 쿠폰번호를 coupon_pk 로 초기화
        int overlap = couponRepository.selectCouponNumber(coupon_pk); //쿠폰번호 중복 조회(있으면 1 반환)
        if(overlap == 0) { //중복된 번호 없으면 생성된 쿠폰값 넣기 (있으면 다시 생성)
            Coupon coupon = new Coupon(); //다시 보낼 Coupon 객체 생성
            coupon.setCoupon_pk(coupon_pk); //쿠폰번호 담기
            coupon.setUser_pk(user_pk); //회원키 담기

            couponRepository.insertJoinCoupon(coupon); //가입한 회원에게 생성된 쿠폰 넣기
        }
    }
    //쿠폰 조회
    public List<Coupon> selectCoupon (int user_pk) {
        return couponRepository.selectCoupon(user_pk);
    }
    //마이페이지 사용가능 쿠폰 개수 조회
    public int selectMyCouponCount (int user_pk) {
        return couponRepository.selectMyCouponCount(user_pk);
    }
    //마이페이지 사용가능 쿠폰 조회
    public List<Coupon> selectMyCouponDetail (int user_pk) {
        return couponRepository.selectMyCouponDetail(user_pk);
    }
    //마이페이지 만료예정 쿠폰 개수 조회
    public int selectExpCoupon (int user_pk) {
        return couponRepository.selectExpCoupon(user_pk);
    }
    //마이페이지 쿠폰 발급/사용 내역 조회
    public List<Coupon> selectCouponDetail (int user_pk) {
        return couponRepository.selectCouponDetail(user_pk);
    }

    public Coupon selectCouponState(String coupon_pk){
        return couponRepository.selectCouponState(coupon_pk);
    }

    /* 결제 또는 결제 취소로 발생한 쿠폰 상태 업데이트 */
    public void updateCouponByPayment(int use_state, String coupon_pk){
        Coupon coupon = new Coupon();
        /*
            결제 : use_state 가 1 일 경우 쿠폰 사용일자 now로 저장
            취소 : 1이 아닐 경우 쿠폰 사용일자 null로 저장
        */
        if(use_state == 1 ){
            Timestamp use_date = Timestamp.valueOf(LocalDateTime.now());

             coupon = Coupon.builder()
                    .c_use_state(use_state)
                    .coupon_pk(coupon_pk)
                    .c_use_date(use_date)
                    .build();
        } else {
            coupon = Coupon.builder()
                    .c_use_state(use_state)
                    .coupon_pk(coupon_pk)
                    .c_use_date(null)
                    .build();
        }

        couponRepository.updateCouponByPayment(coupon);
    }
}
