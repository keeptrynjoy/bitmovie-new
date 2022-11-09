package data.repository;

import data.domain.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PaymentRepository {

    public int selectPaymentData(Payment payment);
}
