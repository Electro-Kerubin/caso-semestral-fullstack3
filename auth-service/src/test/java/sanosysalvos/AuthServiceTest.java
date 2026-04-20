package sanosysalvos;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sanosysalvos.dto.request.LoginRequest;
import sanosysalvos.dto.request.RegisterRequest;
import sanosysalvos.dto.response.LoginResponse;
import sanosysalvos.model.Rol;
import sanosysalvos.model.Status;
import sanosysalvos.model.Usuario;
import sanosysalvos.repository.RolRepository;
import sanosysalvos.repository.StatusRepository;
import sanosysalvos.repository.UserRepository;
import sanosysalvos.service.AuthService;
import sanosysalvos.service.JwtService;
import sanosysalvos.service.PasswordService;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private RolRepository rolRepository;
    @Mock private StatusRepository statusRepository;
    @Mock private PasswordService passwordService;
    @Mock private JwtService jwtService;

    @InjectMocks private AuthService authService;

    private final Rol rolUser    = Rol.builder().idRol(1).descripcion("USER").build();
    private final Status activo  = Status.builder().idStatus(1).descripcion("ACTIVO").build();

    // ---- register ----

    @Test
    void register_shouldReturnTokenWhenEmailIsNew() {
        RegisterRequest req = new RegisterRequest();
        req.setNombreCompleto("Juan");
        req.setEmail("juan@test.com");
        req.setContrasena("password123");
        req.setIdRol(1);

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(false);
        when(rolRepository.findById(1)).thenReturn(Optional.of(rolUser));
        when(statusRepository.findByDescripcion("ACTIVO")).thenReturn(Optional.of(activo));
        when(passwordService.encode(req.getContrasena())).thenReturn("hashed");
        when(userRepository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("jwt-token");

        LoginResponse response = authService.register(req);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("juan@test.com");
        assertThat(response.getRol()).isEqualTo("USER");
        verify(userRepository).save(any(Usuario.class));
    }

    @Test
    void register_shouldThrowWhenEmailAlreadyExists() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("duplicado@test.com");
        req.setContrasena("password123");
        req.setNombreCompleto("Test");
        req.setIdRol(1);

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
        req.setContrasena("password123");

        Usuario usuario = Usuario.builder()
                .email("juan@test.com")
                .nombreCompleto("Juan")
                .contrasena("hashed")
                .rol(rolUser)
                .status(activo)
                .roles(Set.of(rolUser))
                .build();

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(usuario));
        when(jwtService.generateToken(usuario)).thenReturn("jwt-token");

        LoginResponse response = authService.login(req);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getType()).isEqualTo("Bearer");
    }

    @Test
    void login_shouldThrowWhenUserNotFound() {
        LoginRequest req = new LoginRequest();
        req.setEmail("noexiste@test.com");
        req.setContrasena("pass");

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(org.springframework.security.core.userdetails.UsernameNotFoundException.class);
    }
}
