package data.util;

import data.service.user.CouponService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class BatchScheduler {
    private final CouponService couponService;
    //생일 쿠폰 발급
//    @Scheduled(cron = "1/10 * * * * *", zone = "Asia/Seoul") //10초마다 실행
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") //매일 자정 실행
    public void insertBirthCoupon () {
        couponService.insertBirthCoupon();
    }
    //쿠폰 사용기간 만료되면 사용불가
//    @Scheduled(cron = "1/10 * * * * *", zone = "Asia/Seoul") //10초마다 실행
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") //매일 자정 실행
    public void updateCouponState () {
        couponService.updateCouponState();
    }
}
