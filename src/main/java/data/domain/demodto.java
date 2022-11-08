package data.domain;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("demodto")
public class demodto {
    private String id;
    private String name;
}
