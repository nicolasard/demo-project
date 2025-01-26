package ar.nic.security.controller;

import ar.nic.security.openapi.api.UsersApi;
import ar.nic.security.openapi.model.UsersPost201Response;
import ar.nic.security.openapi.model.UsersPostRequest;
import ar.nic.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("security")
public class SecurityUserController implements ar.nic.security.openapi.api.UsersApi {

    final UserService userService;

    @Autowired
    public SecurityUserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Mono<ResponseEntity<UsersPost201Response>> usersPost(Mono<UsersPostRequest> usersPostRequest, ServerWebExchange exchange) {
        return usersPostRequest.flatMap(userService::register).map(t->new ResponseEntity<>(t, HttpStatus.OK));
    }
}
