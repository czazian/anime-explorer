package com.animeexplorer.animeexplorer.entity.Helper;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {

    @CreatedBy
    @Column(name = "CREATED_BY", updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    private String updatedBy;

    @LastModifiedDate
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (createdBy == null || createdBy.isEmpty()) {
            createdBy = "SYSTEM";
        }
        if (updatedBy == null || updatedBy.isEmpty()) {
            updatedBy = "SYSTEM";
        }

        if (createdAt == null) {
            createdAt = now;
        }
        if (updatedAt == null) {
            updatedAt = now;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        if (updatedBy == null || updatedBy.isEmpty()) {
            updatedBy = "SYSTEM";
        }
        updatedAt = LocalDateTime.now();
    }
}