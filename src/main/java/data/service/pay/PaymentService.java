package data.service.pay;

import data.domain.pay.Payment;
import data.repository.pay.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    public int selectPaymentData(Payment payment){
        return paymentRepository.selectPaymentData(payment);
    }
}
