package data.domain.pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Alias("payment")
public class Payment {
    private int payment_pk;
    private int user_pk;
    private int pri_pk;
    private String pay_type;
    private int pay_price;
    private Timestamp pay_date;
    private Timestamp pay_cncl_date;
    private int pay_adult_cnt;
    private int pay_youth_cnt;
    private String mycoupon_pk;
    private int pay_use_point;
    private String pay_state;
}
