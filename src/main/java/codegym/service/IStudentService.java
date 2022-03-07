package codegym.service;

import codegym.model.Student;

public interface IStudentService extends IGeneralService<Student> {
    Iterable<Student> findAllByName(String name);

    Iterable<Student> findAllByProvinceId(Long id);

    void deleteAllByProvinceId(Long id);
}
