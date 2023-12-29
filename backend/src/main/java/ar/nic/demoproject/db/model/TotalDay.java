package ar.nic.demoproject.db.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(title = "TotalDay", description = "The total amount of transactions in a day")
public class TotalDay {
    int day;

    double total;

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
