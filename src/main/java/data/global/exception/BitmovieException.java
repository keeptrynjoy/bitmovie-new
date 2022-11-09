package data.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BitmovieException extends RuntimeException {

    private final ErrorCode errorCode;
}
