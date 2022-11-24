package data.service.pay;

import data.domain.movie.Movie;
import data.domain.pay.Booking;
import data.repository.pay.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {

    public final BookingRepository bookingRepositorys;

    public void insertBookingData(Booking booking){
        bookingRepositorys.insertBookingData(booking);
    }

    /* 영화 리스트(첫번째 포스터만 반환할 수 있도록 데이터가공)*/
    public List<Movie> selectScreeningMovieList(){

        List<Movie> selectMovieList = bookingRepositorys.selectScreeningMovieList();

        for (Movie m : selectMovieList){
            String[] split = m.getM_photo().split(",", 2);
//            System.out.println(split[0]);
            m.setM_photo(split[0]);
        }
        return selectMovieList;
    }

    /* 특정 상영시간에 해당하는 좌석번호 반환 */
    public String reservedSeatList(int screentime){
        return bookingRepositorys.selectSeatNumData(screentime);
    }


    /* 예매된 좌석 여부 조회(예매된 좌석이 있을 경우 true로 반환)*/
    public boolean reservedSeatCheck(Booking booking){

        boolean result = false;

        /* 파라매터를 통해 넘어온 booking 객체에서 좌석번호를 얻어 인스턴스로 선언 */
        String booking_seat= booking.getBook_seat_num();

        /* 기존에 있던 좌석번호를 확인하기위해 상영시간에 해당하는 예매된 좌석 전체를 얻어 인스턴스로 선언 */
        String reserved_seat = bookingRepositorys.selectSeatNumData(booking.getScrtime_pk());
        try {
            /* 문자열로 넘어온 리스트를 split을 통해 나누어 배열로 만든뒤 List 인스턴스 객체로 선언 */
            List<String> booking_list = new ArrayList<>(Arrays.asList(booking_seat.split(",")));
            System.out.println("예매 요청한 좌석번호 : " +booking_list.toString());

            List<String> reserved_list = new ArrayList<>(Arrays.asList(reserved_seat.split(",")));
            System.out.println("예매되어 있는 전체 좌석번호 : " + reserved_list.toString());

            /* retainAll : 2개의 List를 비교하여 기존 List 객체에서 중복된 값만 남기고 나머지는 제거하는 메서드. */
            reserved_list.retainAll(booking_list);
            System.out.println("예매가 불가능한 좌석번호 : " + reserved_list.toString());

            /* 예매된 좌석번호 list가 0과 일치 하지 않을 경우 */
            if(reserved_list.size()>0){
                result = true;
            }
            return result;
        } catch (NullPointerException e) {
            System.out.println("예매되어 있는 좌석이 없음 (상영시간 고유키 : "+ booking.getScrtime_pk());
            return false;
        }
    }
}