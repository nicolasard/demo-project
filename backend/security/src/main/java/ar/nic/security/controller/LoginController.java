package ar.nic.security.controller;

import ar.nic.security.openapi.model.LoginRequest;
import ar.nic.security.openapi.model.LoginResponse;
import ar.nic.security.service.LoginService;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Instant;

@RestController
@RequestMapping("security")
public class LoginController implements ar.nic.security.openapi.api.LoginApi {

    final Tracer tracer = GlobalOpenTelemetry.getTracer("hello-world-tracer");

    final LoginService loginService;

    @Autowired
    public LoginController(final LoginService loginService) {
        this.loginService = loginService;
    }

    @Override
    public Mono<ResponseEntity<LoginResponse>> loginPost(Mono<LoginRequest> loginRequest, ServerWebExchange exchange) {
        return loginRequest
                .flatMap(t->loginService.signIn(t.getUsername(),t.getPassword()))
                .map(t->new LoginResponse(){{setToken(t);}})
                .map(t->new ResponseEntity<>(t,HttpStatus.OK));
    }


}
