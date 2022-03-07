package codegym.controller;

import codegym.model.Province;
import codegym.model.Student;
import codegym.service.IProvinceService;
import codegym.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/provinces")
@CrossOrigin("*")
public class ProvinceController {
    @Autowired
    private IProvinceService provinceService;

    @Autowired
    private IStudentService studentService;

    @GetMapping
    public ResponseEntity<Iterable<Province>> findAllProvinces() {
        Iterable<Province> provinces = provinceService.findAll();
        if (!provinces.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(provinces, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> findProvinceById(@PathVariable Long id) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        return provinceOptional.map(province -> new ResponseEntity<>(province, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Province> saveProvince(@RequestBody Province province) {
        return new ResponseEntity<>(provinceService.save(province), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> updateProvince(@PathVariable Long id, @RequestBody Province province) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        if (!provinceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        province.setId(provinceOptional.get().getId());
        return new ResponseEntity<>(provinceService.save(province), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Province> deleteProvince(@PathVariable Long id) {
        Optional<Province> provinceOptional = provinceService.findById(id);
        if (!provinceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentService.deleteAllByProvinceId(id);
        provinceService.remove(id);
        return new ResponseEntity<>(provinceOptional.get(), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Iterable<Student>> findAllByProvinceId(@PathVariable Long id) {
        Iterable<Student> students = studentService.findAllByProvinceId(id);
        if (!students.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
}
