package data.domain.movie;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("seat")
public class Seat {
    private int seat_pk;
    private int screen_pk;
    private String seat_num;
    private String seat_type;
}
