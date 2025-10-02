package com.animeexplorer.animeexplorer.controller;

import com.animeexplorer.animeexplorer.dto.request.UpdateUserRequestModal;
import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.dto.response.ResponseModel;
import com.animeexplorer.animeexplorer.entity.UserBean;
import com.animeexplorer.animeexplorer.service.UserService;
import com.animeexplorer.animeexplorer.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseModel<Boolean>> createUser(@RequestBody UserCreationRequestModel request) {
        log.info("[POST] User creation request: {}", request);

        boolean isCreated = userService.createUser(request);
        return isCreated
                ? ResponseUtil.success(HttpStatus.CREATED, "User created successfully", true)
                : ResponseUtil.error(HttpStatus.CONFLICT, "Email already exists: " + request.getUserEmail(), false);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseModel<UserBean>> checkUserLogin(@RequestBody UserLoginRequestModel request) {
        log.info("[POST] User login request: {}", request);

        UserBean user = userService.checkUserLogin(request);
        return user != null
                ? ResponseUtil.success(HttpStatus.OK, null, user)
                : ResponseUtil.error(HttpStatus.UNAUTHORIZED, "Invalid credentials", null);
    }

    @PutMapping(value = "/update-profile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseModel<UserBean>> updateUserProfile(
            @PathVariable String userId,
            @ModelAttribute UpdateUserRequestModal request) {

        log.info("[PUT] User profile update with id: {}", userId);

        try {
            UserBean user = userService.updateUserProfile(userId, request);
            return user != null
                    ? ResponseUtil.success(HttpStatus.OK, "Profile updated successfully", user)
                    : ResponseUtil.error(HttpStatus.NOT_FOUND, "User not found", null);

        } catch (MaxUploadSizeExceededException e) {
            log.error("File size exceeded: {}", e.getMessage());
            return ResponseUtil.error(HttpStatus.PAYLOAD_TOO_LARGE,
                    "File size exceeds the maximum allowed limit of 10MB", null);
        }
    }
}