package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Schema(title = "Transactions", description = "Transactions made.")
@Table("transactions")
public class Transaction {

    @Id
    @Column("transactionId")
    private Integer id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Float amount;

    @Schema(maxLength = 3,requiredMode = Schema.RequiredMode.REQUIRED)
    private String currency;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Date date;

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
