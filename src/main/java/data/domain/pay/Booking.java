package data.domain.pay;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    private LocalDateTime book_issu_date;
    private int book_adult_cnt;
    private int book_youth_cnt;
}
