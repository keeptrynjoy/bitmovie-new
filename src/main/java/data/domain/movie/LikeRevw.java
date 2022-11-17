package data.domain.movie;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.annotations.Mapper;

@Setter
@Getter
public class LikeRevw {

    private int review_pk;
    private int user_pk;

}
