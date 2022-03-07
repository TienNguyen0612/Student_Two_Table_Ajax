package codegym.controller;

import codegym.model.Student;
import codegym.service.IProvinceService;
import codegym.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @Autowired
    private IProvinceService provinceService;

    @GetMapping
    public ResponseEntity<Iterable<Student>> findAllStudents(@RequestParam Optional<String> search) {
        Iterable<Student> students;
        if (search.isPresent()) {
            students = studentService.findAllByName(search.get());
        } else {
            students = studentService.findAll();
        }
        if (!students.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findStudentById(@PathVariable Long id) {
        Optional<Student> studentOptional = studentService.findById(id);
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentService.save(student), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Optional<Student> studentOptional = studentService.findById(id);
        if (!studentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        student.setId(studentOptional.get().getId());
        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable Long id) {
        Optional<Student> studentOptional = studentService.findById(id);
        if (!studentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentService.remove(id);
        return new ResponseEntity<>(studentOptional.get(), HttpStatus.NO_CONTENT);
    }
}
