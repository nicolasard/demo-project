package ar.nic.security;

import static org.junit.jupiter.api.Assertions.assertThrows;

import ar.nic.security.utils.JwtValidator;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = JwtValidator.class)
public class JwtValidatorTest {

    final JwtValidator jwtValidator;

    @Autowired
    public JwtValidatorTest(JwtValidator jwtValidator) {
        this.jwtValidator = jwtValidator;
    }

    @Test
    @Disabled("We need to fix this test by using mockito.")
    void loadJwkTest() {
        this.jwtValidator.loadRSAfromJWK("123");
    }

    @Test
    @Disabled("We need to fix this test by using mockito.")
    void validateGoogleTokenOKTest() {
        // TODO use mockito to mock this
        // when(DefaultClaims::getExpiration);
        final String jwtToken =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmNDBmMGE4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUyODczNTk4MDUxMTM1MzQyNjIiLCJlbWFpbCI6Im5pY29sYXMuYXJkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDUwOTU2MDAsIm5hbWUiOiJOaWNvbGFzIEFyZGlzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnpabWRaWTdUVWtGQVdkdlNlaGh5T1FSWTJuMEtWaGlUTXJGN2JTd1ZBMTFrPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5pY29sYXMiLCJmYW1pbHlfbmFtZSI6IkFyZGlzb24iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTcwNTA5NTkwMCwiZXhwIjoxNzA1MDk5NTAwLCJqdGkiOiI3OTliMDcyYjE5ODVmMzdjMTJhZDMyYmZlZGUxODlkNjUwZGZiNjE5In0.eod0r51zxZLyIuxjUxQj_Bz9v24YWmBZBunY94Z0UEeZp_W2rdz2MZ_vWcUSFJWv_AfUroui9fYFSxZ2cxJ6llF9S-aI2MmWxBx8lC7yxCfr6o06v8-5W0GS-sJd3rimI7enDnRbsBBXsKW-ZQOrA8KKielsSprBz6qEXMG6V2P6CpeI-93F-z_-QrdLFeyXngy1JHaiqINu_f0FOfk5qTCp49QjXQbNIQVZJ3sD3BDu8h3XppeAjm3AIhKT3cm9GLg6RddTUhp_Zh1AljCxP-K1I0YgdH6YTE8hnUMl9HkUQxnLKzCb8OOX1otvDgiJQ8gEJtUlb8fd2AvhHjup1g";
        this.jwtValidator.validateGoogleToken(jwtToken);
    }

    @Test
    @Disabled("We need to mock the response from google with the JWK as they rotate that.")
    void validateGoogleTokenExpiredDateTest() {
        final String jwtToken =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmNDBmMGE4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUyODczNTk4MDUxMTM1MzQyNjIiLCJlbWFpbCI6Im5pY29sYXMuYXJkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDUwOTU2MDAsIm5hbWUiOiJOaWNvbGFzIEFyZGlzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnpabWRaWTdUVWtGQVdkdlNlaGh5T1FSWTJuMEtWaGlUTXJGN2JTd1ZBMTFrPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5pY29sYXMiLCJmYW1pbHlfbmFtZSI6IkFyZGlzb24iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTcwNTA5NTkwMCwiZXhwIjoxNzA1MDk5NTAwLCJqdGkiOiI3OTliMDcyYjE5ODVmMzdjMTJhZDMyYmZlZGUxODlkNjUwZGZiNjE5In0.eod0r51zxZLyIuxjUxQj_Bz9v24YWmBZBunY94Z0UEeZp_W2rdz2MZ_vWcUSFJWv_AfUroui9fYFSxZ2cxJ6llF9S-aI2MmWxBx8lC7yxCfr6o06v8-5W0GS-sJd3rimI7enDnRbsBBXsKW-ZQOrA8KKielsSprBz6qEXMG6V2P6CpeI-93F-z_-QrdLFeyXngy1JHaiqINu_f0FOfk5qTCp49QjXQbNIQVZJ3sD3BDu8h3XppeAjm3AIhKT3cm9GLg6RddTUhp_Zh1AljCxP-K1I0YgdH6YTE8hnUMl9HkUQxnLKzCb8OOX1otvDgiJQ8gEJtUlb8fd2AvhHjup1g";
        assertThrows(
                ExpiredJwtException.class, () -> this.jwtValidator.validateGoogleToken(jwtToken));
    }

    @Test
    void validateGoogleTokenWrongSignatureTest() {
        final String jwtToken =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmNDBmMGE4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMjk1Mzk3NDY3NzItZmp0bzA1YnJzbm8zMjI0NTFzcjJkanYyb2V1czRqYjguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUyODczNTk4MDUxMTM1MzQyNjIiLCJlbWFpbCI6Im5pY29sYXMuYXJkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDUwOTU2MDAsIm5hbWUiOiJOaWNvbGFzIEFyZGlzb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnpabWRaWTdUVWtGQVdkdlNlaGh5T1FSWTJuMEtWaGlUTXJGN2JTd1ZBMTFrPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5pY29sYXMiLCJmYW1pbHlfbmFtZSI6IkFyZGlzb24iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTcwNTA5NTkwMCwiZXhwIjoxNzA1MDk5NTAwLCJqdGkiOiI3OTliMDcyYjE5ODVmMzdjMTJhZDMyYmZlZGUxODlkNjUwZGZiNjE5In0.eod0r51zxZLyIuxjUxQj_Bz9v24YWmBZBunY94Z0UEeZp_W2rdz2MZ_vWcUSFJWv_AfUroui9fYFSxZ2cxJ6llF9S-aI2MmWxBx8lC7yxCfr6o06v8-5W0GS-sJd3rimI7enDnRbsBBXsKW-ZQOrA8KKielsSprBz6qEXMG6V2P6CpeI-93F-z_-QrdLFeyXngy1JHaiqINu_f0FOfk5qTCp49QjXQbNIQVZJ3sD3BDu8h3XppeAjm3AIhKT3cm9GLg6RddTUhp_Zh1AljCxP-K1I0YgdH6YTE8hnUMl9HkUQxnLKzCb8OOX1otvDgiJQ8gEJtUlb8fd2AvhHjup1a";
        assertThrows(
                SignatureException.class, () -> this.jwtValidator.validateGoogleToken(jwtToken));
    }
}
