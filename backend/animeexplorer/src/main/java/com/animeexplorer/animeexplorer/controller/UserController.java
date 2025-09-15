package com.animeexplorer.animeexplorer.controller;

import com.animeexplorer.animeexplorer.dto.request.UpdateUserRequestModal;
import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.dto.response.ResponseModel;
import com.animeexplorer.animeexplorer.entity.UserBean;
import com.animeexplorer.animeexplorer.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
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
    public ResponseEntity<ResponseModel<Boolean>> createUser(@RequestBody UserCreationRequestModel requestModel) throws Exception {
        log.info("[POST] User creation request: {}", requestModel);

        boolean createdUser = userService.createUser(requestModel);
        ResponseModel<Boolean> response;

        if (createdUser) {
            response = ResponseModel.<Boolean>builder()
                    .success(true)
                    .message("User created successfully")
                    .data(true)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            response = ResponseModel.<Boolean>builder()
                    .success(false)
                    .message("Email already exists: " + requestModel.getUserEmail())
                    .data(false)
                    .build();

            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseModel<UserBean>> checkUserLogin(@RequestBody UserLoginRequestModel requestModel) throws Exception {
        log.info("[POST] User login request: {}", requestModel);

        UserBean user = userService.checkUserLogin(requestModel);
        ResponseModel<UserBean> response;

        if (!ObjectUtils.isEmpty(user)) {
            response = ResponseModel.<UserBean>builder()
                    .success(true)
                    .data(user)
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response = ResponseModel.<UserBean>builder()
                    .success(false)
                    .data(null)
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping(value = "/update-profile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseModel<UserBean>> updateUserProfile(@PathVariable String userId, @ModelAttribute UpdateUserRequestModal requestModal) throws Exception {
        log.info("[PUT] User profile update with id: {}", userId);

        try {
            UserBean userBean = userService.updateUserProfile(userId, requestModal);

            if (!ObjectUtils.isEmpty(userBean)) {
                ResponseModel<UserBean> response = ResponseModel.<UserBean>builder()
                        .success(true)
                        .message("Profile updated successfully")
                        .data(userBean)
                        .build();

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                ResponseModel<UserBean> response = ResponseModel.<UserBean>builder()
                        .success(false)
                        .message("Profile updated successfully")
                        .data(null)
                        .build();

                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
            }
        } catch (MaxUploadSizeExceededException e) {
            log.error("File size exceeded: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseModel.<UserBean>builder()
                            .success(false)
                            .message("File size exceeds the maximum allowed limit of 10MB")
                            .data(null)
                            .build());

        }
    }

}