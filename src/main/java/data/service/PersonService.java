package data.service;

import data.domain.Person;
import data.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    public Person selectPersonData(int num){
        return personRepository.selectPersonData(num);
    }
}
