package sanosysalvos.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import sanosysalvos.dto.request.LoginRequest;
import sanosysalvos.dto.request.RegisterRequest;
import sanosysalvos.dto.response.LoginResponse;
import sanosysalvos.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;

    /**
     * POST /api/auth/register
     * Registra un nuevo usuario y devuelve un token JWT.
     */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * POST /api/auth/login
     * Autentica un usuario y devuelve un token JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        // Valida credenciales — lanza excepción si son incorrectas
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getContrasena())
        );
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * PATCH /api/auth/verify/{email}
     * Marca el email del usuario como verificado (email_verificado = true).
     */
    @PatchMapping("/verify/{email}")
    public ResponseEntity<Void> verificarEmail(@PathVariable String email) {
        authService.verificarEmail(email);
        return ResponseEntity.noContent().build();
    }
}
