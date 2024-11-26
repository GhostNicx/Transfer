package com.example.sample.repo.security;
import com.example.sample.repo.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepo extends JpaRepository<Person, Long>{
    Optional<Person> findByname(String username);;

}
