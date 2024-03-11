package ar.nic.demoproject.db.repository;

import ar.nic.demoproject.db.model.Category;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository  extends ReactiveCrudRepository<Category, Long> {

}
