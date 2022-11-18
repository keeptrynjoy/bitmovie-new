package data.service.user;

import data.domain.user.Coupon;
import data.domain.user.User;
import data.repository.user.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;
    //user_pk 담긴 list 생성
    //생일 쿠폰 생성
    public void insertBirthCoupon () {
        List<User> userList = couponRepository.selectBirthUser();
        final char[] possibleCharacters =
                {'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        final int possibleCharacterCount = possibleCharacters.length;
        Random rnd = new Random();
        int currentIndex = 0;
        while (currentIndex < userList.size()) { //list 에 담긴 회원수만큼 반복 쿠폰 생성
            StringBuffer buf = new StringBuffer(16);
            for (int i=0; i<8; i++) { //8자리 난수 생성
                buf.append(possibleCharacters[rnd.nextInt(possibleCharacterCount)]);
            }
            String coupon_pk = buf.toString(); //생성한 쿠폰번호를 coupon_pk 로 초기화
            User user = userList.get(currentIndex); //List 형태로 가져온 dto 반복문 돌릴 때마다 펼치기
            int user_pk = user.getUser_pk(); //펼친 dto 에서 user_pk 꺼내오기

            Coupon coupon = new Coupon(); //다시 보낼 Coupon 객체 생성
            coupon.setCoupon_pk(coupon_pk); //쿠폰번호 담기
            coupon.setUser_pk(user_pk); //user_pk 담기

            couponRepository.insertBirthCoupon(coupon);
            currentIndex++;
        }
    }
}
