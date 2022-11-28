package data.domain.pay.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@Getter
@AllArgsConstructor
public class PaymentConfimDto {

    @Min(1)
    private int scrtime_pk;
    @NotNull
    private String seat_num;
}
