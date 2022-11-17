package data.domain.user;

import lombok.*;

@Getter
@Setter
@Builder(builderMethodName = "reportBuilder")
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private int review_pk;
    private int user_pk;
}
