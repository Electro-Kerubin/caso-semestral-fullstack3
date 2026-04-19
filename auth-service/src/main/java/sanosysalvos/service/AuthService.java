package sanosysalvos.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sanosysalvos.dto.request.LoginRequest;
import sanosysalvos.dto.request.RegisterRequest;
import sanosysalvos.dto.response.LoginResponse;
import sanosysalvos.model.Role;
import sanosysalvos.model.User;
import sanosysalvos.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final JwtService jwtService;

    // --- UserDetailsService (requerido por Spring Security) ---

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
    }

    // --- Registro ---

    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordService.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return buildResponse(token, user);
    }

    // --- Login ---

    public LoginResponse login(LoginRequest request) {
        User user = (User) loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(user);

        return buildResponse(token, user);
    }

    // --- Helper ---

    private LoginResponse buildResponse(String token, User user) {
        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }
}
