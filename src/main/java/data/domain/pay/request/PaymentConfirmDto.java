package data.domain.pay.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@Getter
@AllArgsConstructor
public class PaymentConfirmDto {
    @Min(value = 1, message = "상영시간은 숫자만 입력 가능합니다.")
    private int scrtime_pk;
    @NotBlank(message = "좌석번호를 반드시 입력해 주세요.")
    private String seat_num;
}
