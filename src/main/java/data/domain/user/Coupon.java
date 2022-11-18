package data.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Getter
@Setter
@Alias("coupon")
public class Coupon {
    private int coupon_pk; //쿠폰키
    private int user_pk; //회원키
    private String c_number; //쿠폰번호
    private String c_class; //쿠폰분류 (가입쿠폰, 생일쿠폰, 첫 예매쿠폰)
    private int c_amount; //할인금액 (가입쿠폰 : 3000원, 생일쿠폰 : 5000원, 첫 예매쿠폰 : 5000원)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp c_issue_date; //쿠폰발급일
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp c_exp_date; //쿠폰만료일
    private int c_use_state; //사용여부 (1일 경우 사용/소멸, 0일 경우 미사용)
}
