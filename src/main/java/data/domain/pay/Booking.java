package data.domain.pay;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("booking")
public class Booking {
    private int booking_pk;
    private int payment_pk;
    private int screen_pk;
    private int seat_pk;
    private String book_the_name;
    private Timestamp book_issu_date;
}
