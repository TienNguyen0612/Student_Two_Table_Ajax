package codegym.service.impl;

import codegym.model.Student;
import codegym.repository.IStudentRepository;
import codegym.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository iStudentRepository;

    @Override
    public Iterable<Student> findAll() {
        return iStudentRepository.findAll();
    }

    @Override
    public Optional<Student> findById(Long id) {
        return iStudentRepository.findById(id);
    }

    @Override
    public Student save(Student student) {
        return iStudentRepository.save(student);
    }

    @Override
    public void remove(Long id) {
        iStudentRepository.deleteById(id);
    }


    @Override
    public Iterable<Student> findAllByName(String name) {
        return iStudentRepository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Student> findAllByProvinceId(Long id) {
        return iStudentRepository.findAllByProvinceId(id);
    }

    @Override
    public void deleteAllByProvinceId(Long id) {
        iStudentRepository.deleteAllByProvinceId(id);
    }
}
