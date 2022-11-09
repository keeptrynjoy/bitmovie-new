package data.service;

import data.repository.ScreenTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScreenTimeService {

    @Autowired
    ScreenTimeRepository screenTimeRepository;
}
