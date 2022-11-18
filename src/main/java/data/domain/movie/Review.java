package data.domain.movie;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Setter
@Getter
@Builder(builderMethodName = "reviewBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    private int review_pk;
    private int movie_pk;
    private int user_pk;
    private float revw_star;
    private String revw_text;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp revw_date;

}
