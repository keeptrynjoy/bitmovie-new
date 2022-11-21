package data.domain.movie;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;


@Getter
@Setter
public class JoinTime {
    private int screen_pk;
    private Date scrt_date;
    private String scr_name;
    private int movie_pk;
    private String seat_plot;
    private int scr_tot_seat;
    private Time scrt_stime;
    private String the_name;
    private int booked;
}
