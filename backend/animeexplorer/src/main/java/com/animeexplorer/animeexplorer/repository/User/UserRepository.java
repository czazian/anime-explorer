package com.animeexplorer.animeexplorer.repository.User;

import com.animeexplorer.animeexplorer.entity.UserBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserBean, String> {
    boolean existsByEmail(String email);
    UserBean findByEmail(String userEmail);
}
