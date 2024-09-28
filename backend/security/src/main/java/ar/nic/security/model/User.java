package ar.nic.security.model;

import org.springframework.data.annotation.Id;

import java.time.Instant;

/**
 * Holds the user logged using our own authentication system.
 */
public class User {

    @Id
    private Long id;

    private String email;

    private String password;

    private Integer userStatus;

    private String ipLastLogin;

    private Instant dateLastLogin;

    private String userAgentLastLogin;

    public String getUserAgentLastLogin() {
        return userAgentLastLogin;
    }

    public void setUserAgentLastLogin(final String userAgentLastLogin) {
        this.userAgentLastLogin = userAgentLastLogin;
    }

    public Instant getDateLastLogin() {
        return dateLastLogin;
    }

    public void setDateLastLogin(final Instant dateLastLogin) {
        this.dateLastLogin = dateLastLogin;
    }

    public String getIpLastLogin() {
        return ipLastLogin;
    }

    public void setIpLastLogin(final String ipLastLogin) {
        this.ipLastLogin = ipLastLogin;
    }

    public Integer getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(final Integer userStatus) {
        this.userStatus = userStatus;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }
}
