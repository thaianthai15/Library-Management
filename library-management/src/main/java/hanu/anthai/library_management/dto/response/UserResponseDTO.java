package hanu.anthai.library_management.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {

    private Long id;
    private String username;
    private String role;
    private boolean enabled;
}
