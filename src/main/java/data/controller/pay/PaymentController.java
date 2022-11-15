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

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    //결제 성공 데이터 insert
    @PostMapping("/insert_data")
    public ResponseEntity<?> insertPayment(@RequestBody Payment payment){

        //취소일자는 null 값으로 지정
        payment.setPay_cncl_date(null);

        //insert implement 호출
        paymentService.insertPaymentData(payment);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
