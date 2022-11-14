package data.domain.movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(builderMethodName = "castBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class Cast {

    private int cast_pk;
    private int movie_pk;
    private String cast_type;
    private int person_pk;

}
