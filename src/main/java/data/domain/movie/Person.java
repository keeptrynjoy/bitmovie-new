package data.domain.movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@Alias("person")
@Builder(builderMethodName = "personBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    private int person_pk;
    private String per_name;
    private String per_photo;
}
