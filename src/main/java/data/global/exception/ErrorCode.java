package data.global.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST : 잘못된 요청 */
    MISMATCH_PASSWORD(BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    BAD_REQUEST_MOVIE_TIME(BAD_REQUEST, "동일한 상영시간만 결제 가능합니다."),
    BAD_REQUEST_PAYMENT_COMPLETE(BAD_REQUEST, "처리할 결제 정보가 존재하지 않습니다."),
    BAD_REQUEST_PAYMENT_CANCEL(BAD_REQUEST, "취소할 티켓이 존재하지 않습니다."),
    NOT_REFUNDABLE_TIME(BAD_REQUEST, "환불이 가능한 시간이 지났습니다."),
    EMPTY_TICKET_ID(BAD_REQUEST, "티켓 정보가 존재하지 않습니다."),

    /* 403 FORBIDDEN : 접근 권한 제한 */
    /* Valid : 유효한 */
    VALID_USER_ID(FORBIDDEN, "해당 정보에 접근 권한이 존재하지 않습니다."),

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    USER_NOT_FOUND(NOT_FOUND, "해당 유저 정보를 찾을 수 없습니다."),
    EMAIL_NOT_FOUND(NOT_FOUND, "해당 이메일을 찾을 수 없습니다."),
    MOVIE_NOT_FOUND(NOT_FOUND, "해당 제목의 영화를 찾을 수 없습니다."),
    MOVIE_TIME_NOT_FOUND(NOT_FOUND, "해당 영화 시간표 정보를 찾을 수 없습니다"),
    REFRESH_TOKEN_NOT_FOUND(NOT_FOUND, "리프레쉬 토큰을 찾을 수 없습니다."),
    PAYMENT_ID_NOT_FOUND(NOT_FOUND, "결제정보를 찾을 수 없습니다."),
    THEATER_NOT_FOUND(NOT_FOUND, "상영관 정보를 찾을 수 없습니다."),

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    /* DUPLICATE : (다른 무엇과) 똑같은 */
    DUPLICATE_EMAIL(CONFLICT, "이메일이 이미 존재합니다."),
    DUPLICATE_PAYMENT(CONFLICT, "해당 좌석은 현재 판매된 좌석입니다."),
    DUPLICATE_MOVIE(CONFLICT, "해당 영화 정보가 이미 존재합니다."),
    DUPLICATE_MOVIE_TIME(CONFLICT, "해당 영화 시간표 정보가 이미 존재합니다."),
    DELETED_EMAIL(CONFLICT, "이미 삭제된 이메일 입니다."),
    DELETED_MOVIE(CONFLICT, "이미 삭제된 영화 입니다.");

    private final HttpStatus httpStatus;
    private final String detail;

    /* 400 BAD_REQUEST : 잘못된 요청 */
    public static BitmovieException throwMismatchPassword() {
        throw new BitmovieException(MISMATCH_PASSWORD);
    }

    public static BitmovieException throwBadRequestPaymentComplete() {
        throw new BitmovieException(BAD_REQUEST_PAYMENT_COMPLETE);
    }

    /* 403 FORBIDDEN : 접근 권한 제한 */
    public static BitmovieException throwValidUserId() {
        throw new BitmovieException(VALID_USER_ID);
    }

    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */

    public static BitmovieException throwEmailNotFound() {
        throw new BitmovieException(EMAIL_NOT_FOUND);
    }

    public static BitmovieException throwMovieNotFound() {
        throw new BitmovieException(MOVIE_NOT_FOUND);
    }

    public static BitmovieException throwRefreshTokenNotFound() {
        throw new BitmovieException(REFRESH_TOKEN_NOT_FOUND);
    }

    public static BitmovieException throwPaymentIdNotFound() {
        throw new BitmovieException(PAYMENT_ID_NOT_FOUND);
    }

    public static BitmovieException throwTheaterNotFound() {
        throw new BitmovieException(THEATER_NOT_FOUND);
    }

    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    public static BitmovieException throwDuplicateEmail() {
        throw new BitmovieException(DUPLICATE_EMAIL);
    }

    public static BitmovieException throwDuplicatePayment() {
        throw new BitmovieException(DUPLICATE_PAYMENT);
    }

    public static BitmovieException throwDuplicateMovie() {
        throw new BitmovieException(DUPLICATE_MOVIE);
    }

    public static BitmovieException throwDuplicateMovieTime() {
        throw new BitmovieException(DUPLICATE_MOVIE_TIME);
    }

    public static BitmovieException throwDeletedEmail() {
        throw new BitmovieException(DELETED_EMAIL);
    }

    public static BitmovieException throwDeletedMovie() {
        throw new BitmovieException(DELETED_MOVIE);
    }


}