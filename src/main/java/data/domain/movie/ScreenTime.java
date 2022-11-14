package data.domain.movie;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
import java.sql.Time;

@Data
@Alias("screentime")
public class ScreenTime {
    private int scrtime_pk;
    private int screen_pk;
    private int movie_pk;
    private int theater_pk;
    private Date scrt_date;
    private Time scrt_stime;
    private Time scrt_etime;

    private Theater theater;
}
