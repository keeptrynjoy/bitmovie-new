package data.domain.movie;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("theater")
public class Theater {
    private int theater_pk;
    private String the_name;
    private String the_addr;
    private String the_tel;
}
