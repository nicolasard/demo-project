package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Schema(title = "Transactions", description = "Transactions made.")
@Table("transactions")
public class Transaction {

    @Id
    @Column("transactionId")
    private Integer id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Field 'amount' must not be empty.")
    private Float amount;

    @Schema(maxLength = 3, requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Field 'currency' must not be null or empty.")
    private String currency;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Field 'date' must not be null or empty.")
    private Instant date;

    @Column("userInternalId")
    private Integer userInternalId;

    private String description;

    @Transient private Category category;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getUserInternalId() {
        return userInternalId;
    }

    public void setUserInternalId(Integer userInternalId) {
        this.userInternalId = userInternalId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
