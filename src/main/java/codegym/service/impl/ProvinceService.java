package codegym.service.impl;

import codegym.model.Province;
import codegym.repository.IProvinceRepository;
import codegym.service.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProvinceService implements IProvinceService {
    @Autowired
    private IProvinceRepository iProvinceRepository;

    @Override
    public Iterable<Province> findAll() {
        return iProvinceRepository.findAll();
    }

    @Override
    public Optional<Province> findById(Long id) {
        return iProvinceRepository.findById(id);
    }

    @Override
    public Province save(Province province) {
        return iProvinceRepository.save(province);
    }

    @Override
    public void remove(Long id) {
        iProvinceRepository.deleteById(id);
    }
}
