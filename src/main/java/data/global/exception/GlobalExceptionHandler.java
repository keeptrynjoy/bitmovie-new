package data.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /*
       잘못된 데이터 형식으로 요청했을 경우
    */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request
    ){
        log.error("HttpMessageNotReadableException ::", ex);

        String error = "요청 데이터 형식을 확인해주세요.";
        ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(),error);

        return ResponseEntity.badRequest().body(response);
    }


    /*
        valid 유효성 검사 실패
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,WebRequest request){
        log.error("MethodArgumentNotValidException ::", ex);

        List<String> errors =  generateErrors(ex);
        ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(),errors);

        return ResponseEntity.status(response.getStatus()).headers(headers).body(response);
    }

    /*
        인수가 예상한 형식이 아닐 경우
    */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<Object> handelTypeMismatchException(MethodArgumentTypeMismatchException ex){
        log.error("TypeMismatchException :: ", ex);

        String error = "["+ ex.getName() + "]의 타입이 일치하지 않습니다. " + Objects.requireNonNull(ex.getRequiredType().getName());
        ErrorResponse response = new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    /*
        커스텀 예외 발생 시
    */
    @ExceptionHandler(value = BitmovieException.class)
    protected ResponseEntity<ErrorResponse> BitmovieException(BitmovieException ex) {
        log.error("BitmovieException :: ", ex);

        ErrorCode error_code = ex.getErrorCode();
        return ResponseEntity.status(error_code.getHttpStatus()).body(ErrorResponse.toErrorResponse(error_code));
    }

    private List<String> generateErrors(BindException ex) {
        List<String> errors = new ArrayList<>();
        List<ObjectError> all_errors = ex.getBindingResult().getAllErrors();

        for (ObjectError error : all_errors) {
            errors.add(error.getDefaultMessage());
        }
        return errors;
    }

}
