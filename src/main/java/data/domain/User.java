package data.domain;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Mapper
@Alias("user")
public class User {
    private String u_id;
    private String u_pass;
    private String u_name;
    private String u_nick;
    private String u_phone;
    private Timestamp u_birth;
    private String u_gender;
    private String u_photo;
    private String u_pwudtdate;
    private String u_state;
}
