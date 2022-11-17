package data.domain.pay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.sql.Time;
import java.sql.Timestamp;

@Data
@Alias("price")
public class Price {
    private int price_pk;
    private Time pri_stime;
    private Time pri_etime;
    private int pri_youth;
    private int pri_adult;
}
