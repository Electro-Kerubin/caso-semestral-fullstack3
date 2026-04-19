package sanosysalvos.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtConfig {
    /** Clave secreta Base64 para firmar tokens */
    private String secret;
    /** Duración del token en milisegundos (por defecto 24h) */
    private long expiration = 86_400_000L;
}

