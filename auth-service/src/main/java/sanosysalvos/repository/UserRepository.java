package sanosysalvos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sanosysalvos.model.Usuario;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}
