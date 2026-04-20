package sanosysalvos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sanosysalvos.model.Rol;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByDescripcion(String descripcion);
}

