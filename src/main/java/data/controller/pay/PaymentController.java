package data.controller.pay;

import data.domain.pay.Booking;
import data.domain.pay.Payment;
import data.service.pay.PaymentService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/insert_data")
    public ResponseEntity<?> insertPayment(@RequestBody Payment payment,@RequestBody Booking booking){

        paymentService.insertPaymentData(payment);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
