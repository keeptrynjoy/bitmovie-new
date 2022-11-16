package data.controller.pay;

import com.google.gson.Gson;
import data.domain.pay.Booking;
import data.domain.pay.Payment;
import data.domain.user.User;
import data.repository.pay.PaymentRepository;
import data.service.pay.BookingService;
import data.service.pay.PaymentService;
import data.service.user.MyPageService;
import data.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;

    private final MyPageService myPageService;

    private final BookingService bookingService;

    //결제 성공 후 호출 메서드
    @PostMapping("/complete")//@RequestBody Payment payment
    public ResponseEntity<String> paymentComplete(@RequestBody Payment payment, @RequestBody Booking booking ) throws IOException {

        System.out.println(payment.getImp_uid());
        System.out.println(booking.toString());
        //1. 아임포트 토큰 생성
        String token = paymentService.getToken();
        System.out.println("토큰 : " + token);

        //2. 토큰으로 결제 완료된 주문 정보 호출하여 결제 완료된 금액
        int amount = paymentService.paymentInfo(payment.getImp_uid(), token);
        System.out.println(amount);

        try {
            int my_point = myPageService.selectPoint("1");
            int used_point = payment.getPay_use_point();

            //3-1. 사용된 포인트가 유저가 기존에 보유한 포인트보다 많을 경우
            if (my_point < used_point) {
                paymentService.paymentCancle(token, payment.getImp_uid(), amount, "사용 가능 포인트 부족");
                return new ResponseEntity<String>("[결제 취소] 사용가능한 포인트가 부족합니다.", HttpStatus.BAD_REQUEST);
            }

            //4. 특별한 문제가 없을 경우 payment 데이터 저장
            paymentService.insertPaymentData(payment);

            //5. booking 데이터 저장
            bookingService.insertBookingData(booking);

            return new ResponseEntity<>("주문이 완료되었습니다", HttpStatus.OK);
        } catch (Exception e){
            paymentService.paymentCancle(token, payment.getImp_uid(),amount,"결제 예러");
            return new ResponseEntity<>("결제 에러", HttpStatus.OK);
        }
    }

    @GetMapping("/select_payment")
    public Payment selectPaymentData(String payment_pk){
        return paymentService.selectPaymentData(payment_pk);
    }

}
