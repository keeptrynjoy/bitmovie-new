package data.controller.pay;

import data.domain.pay.Booking;
import data.domain.pay.Payment;
import data.service.pay.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    //결제 성공 후 호출 메서드
    @PostMapping("/complete")//@RequestBody Payment payment
    public ResponseEntity<?> paymentComplete(@RequestBody Payment payment) throws IOException {

        //1. 아임포트 토큰 생성
        String token = paymentService.getToken();
        System.out.println("토큰 : " + token);

        //2. 토큰으로 결제 완료된 주문 정보 호출하여 결제 완료된 금액
        int amount = paymentService.paymentInfo(payment.getImp_uid(),token);

//        //취소일자는 null 값으로 지정
//        payment.setPay_cncl_date(null);
//
//        //insert
//        paymentService.insertPaymentData(payment);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
