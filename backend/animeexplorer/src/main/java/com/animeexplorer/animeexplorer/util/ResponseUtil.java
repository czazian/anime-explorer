package com.animeexplorer.animeexplorer.util;

import com.animeexplorer.animeexplorer.dto.response.ResponseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
public final class ResponseUtil {

    public static <T> ResponseEntity<ResponseModel<T>> success(HttpStatus status, String message, T data) {
        ResponseModel<T> response = ResponseModel.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.status(status).body(response);
    }

    public static <T> ResponseEntity<ResponseModel<T>> error(HttpStatus status, String message, T data) {
        ResponseModel<T> response = ResponseModel.<T>builder()
                .success(false)
                .message(message)
                .data(data)
                .build();
        return ResponseEntity.status(status).body(response);
    }
}