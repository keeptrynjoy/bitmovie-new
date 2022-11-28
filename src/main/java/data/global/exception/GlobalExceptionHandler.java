package data.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<Object> handelMethodArgumentNotValidException(TypeMismatchException ex){
//        log.error("TypeMismatchException :: ", ex);
//
//        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,ex.)
//        return ResponseEntity.status();
//    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<Object> handelTypeMismatchException(MethodArgumentTypeMismatchException ex){
        log.error("TypeMismatchException :: ", ex);

        String error = "["+ ex.getName() + "]의 타입이 일치하지 않습니다. " + Objects.requireNonNull(ex.getRequiredType().getName());
        ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);

        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @ExceptionHandler(value = BitmovieException.class)
    protected ResponseEntity<ErrorResponse> BitmovieException(BitmovieException ex) {
        log.error("BitmovieException :: ", ex);

        ErrorCode errorCode = ex.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(ErrorResponse.toErrorResponse(errorCode));
    }

}
