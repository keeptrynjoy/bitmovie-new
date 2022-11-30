package data.domain.user;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class MWish {

    @Id
    private int movie_pk;

    @Id
    private int user_pk;
}
