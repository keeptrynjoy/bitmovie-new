package data.repository.pay;

import data.domain.movie.Review;
import data.domain.pay.Booking;
import data.domain.pay.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface PaymentRepository {

    public Payment selectPaymentData(String payment_pk);

    public void insertPaymentData(Payment payment);

    public void insertReviewMacro(Review review);

    public Payment selectPayByUserAndBookPK(Map<String,Object> map);
}

