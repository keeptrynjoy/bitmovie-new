package data.domain.pay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Alias("booking")
public class Booking {
    private int booking_pk;
    private String payment_pk;
    private int scrtime_pk;
    private String book_seat_num;
    private String book_the_name;
    private Timestamp book_issu_date;
    private int book_adult_cnt;
    private int book_youth_cnt;
}
