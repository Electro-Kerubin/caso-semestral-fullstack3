package sanosysalvos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sanosysalvos.model.Status;

import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Integer> {
    Optional<Status> findByDescripcion(String descripcion);
}

