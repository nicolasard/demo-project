package ar.nic.demoproject.services;

import ar.nic.demoproject.db.model.Category;
import ar.nic.demoproject.db.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Flux<Category> getCategories(){
        return this.categoryRepository.findAll();
    }
}
