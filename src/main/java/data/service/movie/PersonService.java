package data.service.movie;

import data.domain.movie.Person;
import data.repository.movie.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonService {


    private final PersonRepository personRepository;

    public Person selectPersonData(int num){
        return personRepository.selectPersonData(num);
    }
}
