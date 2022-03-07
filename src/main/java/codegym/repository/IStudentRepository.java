package codegym.repository;

import codegym.model.Province;
import codegym.model.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IStudentRepository extends CrudRepository<Student, Long> {
    Iterable<Student> findAllByNameContaining(String name);

    Iterable<Student> findAllByProvinceId(Long id);

    void deleteAllByProvinceId(Long id);
}
