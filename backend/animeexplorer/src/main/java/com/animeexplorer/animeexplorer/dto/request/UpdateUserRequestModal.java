package com.animeexplorer.animeexplorer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequestModal {
    private MultipartFile profileImage;
    private String username;
    private String profileDescription;
}
