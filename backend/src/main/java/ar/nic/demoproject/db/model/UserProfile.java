package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;

@Schema(title = "User", description = "The user information in the system.")
@Table("users")
public class UserProfile {

    public UserProfile(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
    }

    @Schema(example = "John Doe")
    private String fullName;

    @Schema(example = "john@example.com")
    private String email;

    private Integer internalId;

    @Transient
    private Currency defaultCurrency;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getInternalId() {
        return internalId;
    }

    public void setInternalId(Integer internalId) {
        this.internalId = internalId;
    }

    public Currency getDefaultCurrency() {
        return defaultCurrency;
    }

    public void setDefaultCurrency(Currency defaultCurrency) {
        this.defaultCurrency = defaultCurrency;
    }
}
