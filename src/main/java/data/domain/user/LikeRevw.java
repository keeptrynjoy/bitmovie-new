package data.domain.user;

import lombok.*;
import org.apache.ibatis.annotations.Mapper;
@Data
public class LikeRevw {

    private int review_pk;
    private int user_pk;

}
