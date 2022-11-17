package data.domain.pay;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Alias("payment")
public class Payment {
    private String payment_pk;
    private int user_pk;
    private String pay_type;
    private int pay_price;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime pay_date;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime pay_cncl_date;
    private String mycoupon_pk;
    private int pay_use_point;
    private String pay_state;
    private String imp_uid;
}
