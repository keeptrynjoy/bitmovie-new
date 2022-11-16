package data.repository.pay;

import data.domain.pay.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PaymentRepository {

    public Payment selectPaymentData(String payment_pk);

    public void insertPaymentData(Payment payment);
}

