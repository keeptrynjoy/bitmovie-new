package data.service.pay;

import data.repository.pay.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriceService {

    @Autowired
    PriceRepository priceRepository;
}
