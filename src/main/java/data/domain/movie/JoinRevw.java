package data.domain.movie;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRevw {

    private int review_pk;
    private int movie_pk;
    private int user_pk;
    private String revw_star;
    private String revw_text;
    private int count_like;
    private int count_report;

}
