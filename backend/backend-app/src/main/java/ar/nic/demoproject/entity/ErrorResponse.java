package ar.nic.demoproject.entity;

import java.util.List;

public class ErrorResponse {

    private String errorDescription;

    private List<ErrorResponsesDetails> errorResponsesDetailsList;

    public String getErrorDescription() {
        return errorDescription;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public List<ErrorResponsesDetails> getErrorResponsesDetailsList() {
        return errorResponsesDetailsList;
    }

    public void setErrorResponsesDetailsList(
            List<ErrorResponsesDetails> errorResponsesDetailsList) {
        this.errorResponsesDetailsList = errorResponsesDetailsList;
    }

    public static class ErrorResponsesDetails {

        String field;

        String message;

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
