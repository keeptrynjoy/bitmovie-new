package data.domain.movie;

import lombok.*;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder(builderMethodName = "reviewBuilder")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review {

    private int review_pk;
    private int movie_pk;
    private int user_pk;
    private float revw_star;
    private String revw_text;
    private LocalDateTime revw_date;
}
