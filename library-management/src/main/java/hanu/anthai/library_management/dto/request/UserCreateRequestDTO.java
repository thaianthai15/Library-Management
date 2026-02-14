package hanu.anthai.library_management.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreateRequestDTO {

    @NotBlank
    private String username;

    @NotBlank
    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).*$", message = "Password must contain both letters and numbers")
    private String password;

    @NotBlank
    private String role; // ADMIN / STAFF
}
