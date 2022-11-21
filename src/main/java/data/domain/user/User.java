package data.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Getter
@Setter
@Alias("user")
public class User {
    private int user_pk;
    private String u_id;
    private String u_pass;
    private String u_name;
    private String u_nick;
    private String u_phone;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp u_birth;
    private String u_gender;
    private String u_photo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp u_pwudtdate;
    private int u_state;
    private int u_point;
}
