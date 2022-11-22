package data.domain.movie;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
import java.sql.Time;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Alias("screentime")
public class ScreenTime {
    private int scrtime_pk;
    private int screen_pk;
    private int movie_pk;
    private int theater_pk;
    private Date scrt_date;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Time scrt_stime;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Time scrt_etime;
    private int booked;
}
