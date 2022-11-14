package data.domain.movie;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("person")
public class Person {

    private int person_pk;
    private String per_name;
    private String per_photo;
}
