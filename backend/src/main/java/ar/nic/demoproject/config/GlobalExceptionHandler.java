package ar.nic.demoproject.config;

import ar.nic.demoproject.entity.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Mono<ErrorResponse> handleException(Exception ex, ServerWebExchange exchange) {
        if (ex instanceof final WebExchangeBindException webExchangeBindException){
            final ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setErrorDescription("Invalid request.");
            final List<ErrorResponse.ErrorResponsesDetails> errors = new ArrayList<>();
            for (ObjectError objectError : webExchangeBindException.getAllErrors()){
                if (objectError instanceof final FieldError fieldError){
                    final ErrorResponse.ErrorResponsesDetails errorResponsesDetails = new ErrorResponse.ErrorResponsesDetails();
                    errorResponsesDetails.setField(fieldError.getField());
                    errorResponsesDetails.setMessage(fieldError.getDefaultMessage());
                    errors.add(errorResponsesDetails);
                }
            }
            errorResponse.setErrorResponsesDetailsList(errors);
            return Mono.just(errorResponse);
        }
        final ErrorResponse er = new ErrorResponse();
        er.setErrorDescription(ex.getLocalizedMessage());
        logger.error("Unexpected error",ex);
        return Mono.just(er);
    }
}