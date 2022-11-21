package data.domain.movie;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JoinCast {

    private int cast_pk;
    private int movie_pk;
    private String cast_type;
    private int person_pk;
    private String per_name;
    private String per_photo;
    private String m_name;
    private String m_sdate;
    private String m_photo;
}
