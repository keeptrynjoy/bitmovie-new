package data.repository.pay;

import data.domain.pay.Booking;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface BookingRepository {

    public void insertBookingData(Booking booking);
}
