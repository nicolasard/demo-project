package ar.nic.demoproject.utils;

import ar.nic.demoproject.db.model.UserProfile;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.security.Principal;

public class PrincipalMapper {

    public static UserProfile getUserProfile(Principal principal){
        if (principal instanceof JwtAuthenticationToken){
            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) principal;
            final String email = jwtAuthenticationToken.getTokenAttributes().get("email").toString();
            final String fullName = jwtAuthenticationToken.getTokenAttributes().get("name").toString();
            return new UserProfile(fullName,email);
        }
        throw new RuntimeException("Unable to get the email");
    }
}
