package data.service.pay;

import data.domain.pay.Payment;
import data.repository.pay.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public int selectPaymentData(Payment payment){
        return paymentRepository.selectPaymentData(payment);
    }

    public void insertPaymentData(Payment payment) {
        paymentRepository.insertPaymentData(payment);

    }
}
