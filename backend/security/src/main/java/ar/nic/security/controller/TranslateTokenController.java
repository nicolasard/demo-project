package ar.nic.security.controller;

import ar.nic.security.openapi.api.TranslateTokenApi;
import ar.nic.security.openapi.model.LoginResponse;
import ar.nic.security.openapi.model.TranslateTokenRequest;
import ar.nic.security.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("security")
public class TranslateTokenController implements ar.nic.security.openapi.api.TranslateTokenApi {

    final LoginService loginService;

    public TranslateTokenController(LoginService loginService) {
        this.loginService = loginService;
    }

    @Override
    public Mono<ResponseEntity<LoginResponse>> translateTokenPost(Mono<TranslateTokenRequest> translateTokenRequest, ServerWebExchange exchange) {
        return translateTokenRequest
                .flatMap(t->loginService.translateToken(t.getToken()))
                .map(t->new LoginResponse(){{setToken(t);}})
                .map(t->new ResponseEntity<>(t, HttpStatus.OK));
    }
}
