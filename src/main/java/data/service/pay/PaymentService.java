package data.service.pay;

import data.domain.Payment;
import data.repository.PaymentRepository;
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
