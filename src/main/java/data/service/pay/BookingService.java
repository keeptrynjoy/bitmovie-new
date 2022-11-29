package data.service.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import data.domain.pay.request.PaymentConfirmDto;
import data.global.exception.ErrorCode;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {

    public final BookingRepository bookingRepository;

    public void insertBookingData(Booking booking){
        bookingRepository.insertBookingData(booking);
    }

    /* 특정 상영시간에 해당하는 좌석번호 반환 */
    public String reservedSeatList(int screentime){
        return bookingRepository.selectSeatNumData(screentime);
    }


    /* 예매된 좌석 여부 조회(예매된 좌석이 있을 경우 true로 반환)*/
    public String reservedSeatCheck(PaymentConfirmDto paymentConfirmDto){

        /* 기존에 있던 좌석번호를 확인하기위해 상영시간에 해당하는 예매된 좌석 전체를 얻어 인스턴스로 선언 */
        String reserved_seat = bookingRepository.selectSeatNumData(paymentConfirmDto.getScrtime_pk());
        try {
            /* 문자열로 넘어온 리스트를 split을 통해 나누어 배열로 만든뒤 List 인스턴스 객체로 선언 */
            List<String> booking_list = new ArrayList<>(Arrays.asList(paymentConfirmDto.getSeat_num().split(",")));
            System.out.println("예매 요청한 좌석번호 : " +booking_list.toString());

            List<String> reserved_list = new ArrayList<>(Arrays.asList(reserved_seat.split(",")));
            System.out.println("예매되어 있는 전체 좌석번호 : " + reserved_list.toString());

            /* retainAll : 2개의 List를 비교하여 기존 List 객체에서 중복된 값만 남기고 나머지는 제거하는 메서드. */
            reserved_list.retainAll(booking_list);
            System.out.println("예매가 불가능한 좌석번호 : " + reserved_list.toString());

            /* 요청한 좌석번호가 현재 예매되어 있을경우 */
            if(reserved_list.size()>0){
                throw ErrorCode.throwDuplicatePayment();
            }
            return "true";

        } catch (NullPointerException e) {
            System.out.println("예매되어 있는 좌석이 없음 (상영시간 고유키 : "+ paymentConfirmDto.getScrtime_pk());
            return "true";
        }
    }

    public void deleteBookingData(int booking_pk){
        bookingRepository.deleteBookingData(booking_pk);
    }
}