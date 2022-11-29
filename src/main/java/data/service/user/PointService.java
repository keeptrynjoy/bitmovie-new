package data.service.user;

import data.domain.pay.Booking;
import data.domain.pay.Payment;
import data.domain.user.MyPage;
import data.domain.user.Point;
import data.domain.user.User;
import data.repository.user.MyPageRepository;
import data.repository.user.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;


    private static final int POINT_RATE = 3;

    public int selectPointByUser(int user_pk){
        return pointRepository.selectPointByUser(user_pk);
    }

    /* 포인트 적립 */
    @Transactional
    public void accumulatePoint(Payment payment, int use_state){

        Point point = new Point();

        if(use_state==1){
            //payment 객체에 저장된 가격을 인스턴스로 선언히여 호출.
            int price = payment.getPay_price();
            System.out.println("최종 결제 금액 : " + price);
            //적립금 = 결제 금액 * 적립율
            int calculation_point = Math.round((price * POINT_RATE / 100)/10)*10;
            System.out.println("계산된 포인트 적립금: " + calculation_point);

            point = Point.builder()
                    .user_pk(payment.getUser_pk())
                    .po_point(calculation_point)
                    .po_date(payment.getPay_date())
                    .po_history("결제 완료 - 포인트 적립")
                    .payment_pk(payment.getPayment_pk())
                    .build();

        } else {

            point = Point.builder()
                    .user_pk(payment.getUser_pk())
                    .po_point(payment.getPay_use_point())
                    .po_date(LocalDateTime.now())
                    .po_history("결제 취소 - 사용 포인트 환급")
                    .build();
        }


        //point 테이블에 적립 데이터 저장
        pointRepository.insertPointData(point);

        //user 테이블에 포인트 추가 업데이트
        pointRepository.updatePoint(point);
    }

    /* 포인트 차감 */
    @Transactional
    public void deductionPoint(Payment payment,int use_state){

        Point point = new Point();

        /* 결제 후*/
        if(use_state == 1){
            //인스턴스로 선언한 point 객체에 받아온 포인트값을 음수로 변환하여 옮겨 담음
            point = Point.builder()
                    .user_pk(payment.getUser_pk())
                    .po_point(-payment.getPay_use_point())
                    .po_date(payment.getPay_date())
                    .po_history("결제 완료 - 사용 포인트 차감")
                    .build();
            System.out.println("차감 포인트 : " + point.getPo_point());
        /* 결제 취소 후 */
        } else {
            int accumulate_point = pointRepository.selectPointByPayment(payment.getPayment_pk());

            point = Point.builder()
                    .user_pk(payment.getUser_pk())
                    .po_point(-accumulate_point)
                    .po_date(LocalDateTime.now())
                    .po_history("결제 취소 - 적립 포인트 차감")
                    .build();
        }

        //point 테이블에 적립 데이터 저장
        pointRepository.insertPointData(point);

        //user 테이블에 포인트 추가 업데이트
        pointRepository.updatePoint(point);

    }

    //유저 보유 포인트 조회
    public int selectPoint (int user_pk) {
        return pointRepository.selectPoint(user_pk);
    }
    //유저 보유 포인트 갱신
    public void updatePoint (Point point) {
        pointRepository.updatePoint(point);
    }
    //마이페이지 포인트 적립/소멸 조회
    public List<MyPage> selectPointDetail (int user_pk) {
        return pointRepository.selectPointDetail(user_pk);
    }
}
