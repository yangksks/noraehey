package com.singsong.db.repository;

import com.singsong.db.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository  extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByTagName(String tagName);
    Optional<Tag> findByTagId(Long tagId);
}
