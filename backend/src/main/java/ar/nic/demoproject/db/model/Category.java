package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Id;

@Schema(title = "Category", description = "Categories for the expenses")
public class Category {

    @Id
    String categoryId;

    String categoryName;

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
