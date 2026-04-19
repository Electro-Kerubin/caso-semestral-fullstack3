package sanosysalvos;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import sanosysalvos.dto.request.LoginRequest;
import sanosysalvos.dto.request.RegisterRequest;
import sanosysalvos.dto.response.LoginResponse;
import sanosysalvos.model.Role;
import sanosysalvos.model.User;
import sanosysalvos.repository.UserRepository;
import sanosysalvos.service.AuthService;
import sanosysalvos.service.JwtService;
import sanosysalvos.service.PasswordService;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordService passwordService;
    @Mock private JwtService jwtService;
    @Mock private AuthenticationManager authenticationManager;

    @InjectMocks private AuthService authService;

    // ---- register ----

    @Test
    void register_shouldReturnTokenWhenEmailIsNew() {
        RegisterRequest req = new RegisterRequest();
        req.setName("Juan");
        req.setEmail("juan@test.com");
        req.setPassword("password123");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(false);
        when(passwordService.encode(req.getPassword())).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwt-token");

        LoginResponse response = authService.register(req);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("juan@test.com");
        assertThat(response.getRole()).isEqualTo("USER");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_shouldThrowWhenEmailAlreadyExists() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("duplicado@test.com");
        req.setPassword("password123");
        req.setName("Test");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(true);

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ya está registrado");
    }

    // ---- login ----

    @Test
    void login_shouldReturnTokenOnValidCredentials() {
        LoginRequest req = new LoginRequest();
        req.setEmail("juan@test.com");
        req.setPassword("password123");

        User user = User.builder()
                .email("juan@test.com")
                .name("Juan")
                .password("hashed")
                .role(Role.USER)
                .enabled(true)
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");

        LoginResponse response = authService.login(req);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getType()).isEqualTo("Bearer");
    }

    @Test
    void login_shouldThrowOnInvalidCredentials() {
        LoginRequest req = new LoginRequest();
        req.setEmail("juan@test.com");
        req.setPassword("wrong");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Credenciales incorrectas"));

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(BadCredentialsException.class);
    }
}

