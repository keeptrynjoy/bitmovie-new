package data.util;

import data.service.api.TheMovieService;
import data.service.user.CouponService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BatchScheduler {
    private final CouponService couponService;
    private final TheMovieService theMovieService;
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

    // 매일 업데이트 되는 인기차트 순위의 영화 데이터를 확인 후 , db에 없는 값들을 입력
    @Scheduled(cron="0 0 1 * * *", zone = "Asia/Seoul")
    public void insertTMDB (){
        int page_num = 1;

        //해당 페이지에 있는 영화 id를 반환
        List<Object> movie_id_list = theMovieService.movieListApi(page_num);
        for (int i = 0; i < movie_id_list.size(); i++) {
            // movie_id 를 통해 더무비 에서 제공해주는 영화 상세정보를 db에 저장
            theMovieService.movieDataSave(movie_id_list.get(i));
            // movie_id 를 통해 더무비 포스터를 db에 저장
            theMovieService.updatePhoto(movie_id_list.get(i));
            // 영어 이름 저장
            theMovieService.updateEnName(movie_id_list.get(i));
            // 영화 트레일러 저장
            theMovieService.updateVideo(movie_id_list.get(i));
            // 해당 영화의 등장인물 정보 저장
            theMovieService.personDataList(movie_id_list.get(i));
        }
    }
}
