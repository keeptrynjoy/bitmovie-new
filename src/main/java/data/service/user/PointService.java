package data.service.user;

import data.domain.pay.Booking;
import data.domain.pay.Payment;
import data.domain.user.Point;
import data.domain.user.User;
import data.repository.user.MyPageRepository;
import data.repository.user.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    private final MyPageRepository myPageRepository;

    private static final int POINT_RATE = 3;

    public int selectPointByUser(int user_pk){
        return pointRepository.selectPointByUser(user_pk);
    }

    /* 포인트 적립 */
    public void accumulatePoint(Payment payment){

        //payment 객체에 저장된 가격을 인스턴스로 선언히여 호출.
        int price = payment.getPay_price();

        System.out.println("최종 결제 금액 : " + price);

        //적립금 = 결제 금액 * 적립율
        int calculation_point = Math.round((price * POINT_RATE / 100)/10)*10;

        System.out.println("계산된 포인트 적립금: " + calculation_point);
        Point point = new Point();

        //포인트 컬럼에 set
        point.setPo_point(calculation_point);
        //인스턴스로 선언한 point 객체에 payment 객체에 저장된 데이터를 옮겨 담음
        point.setUser_pk(payment.getUser_pk());
        point.setPo_date(payment.getPay_date());

        //point 테이블에 적립 데이터 저장
        pointRepository.insertPointData(point);

        //user 테이블에 포인트 추가 업데이트
        myPageRepository.updatePoint(point);
    }

    /* 포인트 차감 */
    public void deductionPoint(Payment payment){

        Point point = new Point();

        int used_point =  payment.getPay_use_point();

        //인스턴스로 선언한 point 객체에 받아온 포인트값을 음수로 변환하여 옮겨 담음
        point.setPo_point(-used_point);
        System.out.println("차감 포인트 : " + point.getPo_point());
        //인스턴스로 선언한 point 객체에 payment 객체에 저장된 데이터를 옮겨 담음
        point.setUser_pk(payment.getUser_pk());
        point.setPo_date(payment.getPay_date());

        //point 테이블에 적립 데이터 저장
        pointRepository.insertPointData(point);

        //user 테이블에 포인트 추가 업데이트
        myPageRepository.updatePoint(point);

    }
}
