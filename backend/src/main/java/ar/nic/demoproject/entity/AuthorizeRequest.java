package ar.nic.demoproject.entity;

import ar.nic.demoproject.db.model.AuthenticationType;

public class AuthorizeRequest {
    AuthenticationType authenticationType;

    String token;

    public AuthenticationType getAuthenticationType() {
        return authenticationType;
    }

    public void setAuthenticationType(AuthenticationType authenticationType) {
        this.authenticationType = authenticationType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
