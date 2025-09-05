package com.animeexplorer.animeexplorer.controller;

import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.dto.response.ResponseModel;
import com.animeexplorer.animeexplorer.entity.UserBean;
import com.animeexplorer.animeexplorer.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

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

}