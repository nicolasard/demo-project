package ar.nic.demoproject.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(title = "User", description = "The user information in the system.")
public class UserProfile {

    public UserProfile(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
    }

    @Schema(example = "John Doe")
    private String fullName;

    @Schema(example = "john@example.com")
    private String email;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
