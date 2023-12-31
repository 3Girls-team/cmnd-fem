package ru.itgirls.adventlearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itgirls.adventlearning.entity.Theme;


@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {
}
