package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Id;

@Schema(title = "Currency", description = "The ISO 4217 currencies table.")
public class Currency {

    public Currency(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    @Id String currencyCode;

    String currencyDescription;

    String currencySymbol;

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getCurrencyDescription() {
        return currencyDescription;
    }

    public void setCurrencyDescription(String currencyDescription) {
        this.currencyDescription = currencyDescription;
    }

    public String getCurrencySymbol() {
        return currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }
}
