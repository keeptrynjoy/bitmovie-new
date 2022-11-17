package data.domain.pay;

import lombok.*;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Alias("payment")
public class Payment {
    private String payment_pk;
    private int user_pk;
    private String pay_type;
    private int pay_price;
    private Timestamp pay_date;
    private Timestamp pay_cncl_date;
    private String mycoupon_pk;
    private int pay_use_point;
    private String pay_state;
    private String imp_uid;
}
