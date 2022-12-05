package data.service.pay;

import data.domain.pay.Payment;
import data.repository.movie.ScreenTimeRepository;
import data.repository.pay.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment selectPaymentData(String payment_pk) {
        return paymentRepository.selectPaymentData(payment_pk);
    }

    public void insertPaymentData(Payment payment) {
        paymentRepository.insertPaymentData(payment);
    }

    public Payment selectPayByUserAndBookPK(int user, int booking_pk){

        Map <String,Integer> map = new HashMap<>();
        map.put("user_pk",user);
        map.put("booking_pk",booking_pk);
        return paymentRepository.selectPayByUserAndBookPK(map);
    }

    public void updatePayCnclDate(String payment_pk){
        paymentRepository.updatePayCnclDate(payment_pk);
    }

//    private final MovieRepository movieRepository;

//    private final ReviewRepository reviewRepository;

//    public void insertReviewMacro(){
//
//        List<Movie> movie_pk_list =  movieRepository.selectTotalMovie();
//
//        List<String> review_content = new ArrayList<>();
//        review_content.add("영화 진짜 재밌어요.");
//        review_content.add("2022년 최고의 영화입니다");
//        review_content.add("정신 나갈거 같아요.. 너무 잼나요");
//        review_content.add("난 별로던데 다들 댓글 알바 아님?");
//        review_content.add("근래에 봤던 영화중에 가장 재미있었어요");
//        review_content.add("감독님 사랑해요!");
//        review_content.add("칸 영화제 가즈아");
//        review_content.add("잘봤습니다!");
//        review_content.add("쏘쏘함");
//        review_content.add("아니 근데 너무 재밌는거 아니에용?");
//
//        for(Movie m : movie_pk_list){
//
//            DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//
//            LocalDateTime sdate = LocalDateTime.parse(m.getM_sdate()+" 00:00:00",format);
//
//            for(int i=0; i<=9; i++){
//                Review review = Review.reviewBuilder()
//                        .movie_pk(m.getMovie_pk())
//                        .user_pk(i+1)
//                        .revw_star((int)(Math.random()*4)+1)
//                        .revw_text(review_content.get(i))
//                        .revw_date(sdate.plusHours(i))
//                        .build();
//
////            System.out.println(review);
//
//                reviewRepository.insertReview(review);
//            }
//
//        }
//
//    }
}
