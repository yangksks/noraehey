package com.singsong.db.repository;

import com.singsong.db.entity.Magazine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MagazineRepository extends JpaRepository<Magazine, Long> {
    Optional<Magazine> findByMagazineId(Long magazineId);
    void deleteByMagazineId(Long magazineId);
}
