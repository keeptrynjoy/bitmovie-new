package data.domain.pay.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
@Getter
@AllArgsConstructor
public class PaymentConfirmDto {

    @NotNull
    private int scrtime_pk;
    @NotNull
    private String seat_num;
}
