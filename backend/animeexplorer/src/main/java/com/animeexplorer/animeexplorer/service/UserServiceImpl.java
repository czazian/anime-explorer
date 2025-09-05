package com.animeexplorer.animeexplorer.service;

import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.entity.UserBean;
import com.animeexplorer.animeexplorer.repository.UserRepository;
import com.animeexplorer.animeexplorer.util.PasswordUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean createUser(UserCreationRequestModel requestModel) throws Exception {
        // Check if email already exists
        if (userRepository.existsByEmail(requestModel.getUserEmail())) {
            log.warn("Email already exists: {}", requestModel.getUserEmail());
            return false;
        }

        // Create new user entity
        UserBean user = new UserBean();
        user.setUsername(requestModel.getUserName());
        user.setEmail(requestModel.getUserEmail());
        user.setPassword(PasswordUtils.hashPassword(requestModel.getUserPassword()));

        // Save user
        userRepository.save(user);

        return true;
    }

    public UserBean checkUserLogin(UserLoginRequestModel requestModel) throws NoSuchAlgorithmException, InvalidKeySpecException {
        UserBean user = userRepository.findByEmail(requestModel.getUserEmail());

        if (user == null) {
            return null;
        }

        boolean passwordMatches = PasswordUtils.verifyPassword(requestModel.getUserPassword(), user.getPassword());
        if (!passwordMatches) {
            return null;
        }
        return user;
    }



}
