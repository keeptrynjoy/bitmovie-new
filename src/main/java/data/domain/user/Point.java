package data.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@Alias("point")
@Builder(builderMethodName = "pointBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class Point {

    private int movie_pk;
    private String m_name;
    private String m_type;
    private String m_sdate;
    private String m_edate;
    private int m_runtime;
    private String m_age_grd;
    private String m_info;
    private String m_photo;
}
