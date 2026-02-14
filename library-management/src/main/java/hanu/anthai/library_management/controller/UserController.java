package hanu.anthai.library_management.controller;

import hanu.anthai.library_management.dto.request.UserCreateRequestDTO;
import hanu.anthai.library_management.dto.response.UserResponseDTO;
import hanu.anthai.library_management.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponseDTO create(@RequestBody @Valid UserCreateRequestDTO dto) {
        return userService.createUser(dto);
    }

    @GetMapping
    public List<UserResponseDTO> getAll() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}/disable")
    public void disable(@PathVariable Long id) {
        userService.disableUser(id);
    }

    @PutMapping("/{id}/enable")
    public void enable(@PathVariable Long id) {
        userService.enableUser(id);
    }


    @PutMapping("/{id}")
    public UserResponseDTO update(@PathVariable Long id, @RequestBody UserCreateRequestDTO dto) {
        return userService.updateUser(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {userService.deleteUser(id);}
}

