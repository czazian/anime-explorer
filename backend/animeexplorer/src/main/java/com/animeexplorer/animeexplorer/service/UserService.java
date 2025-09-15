package com.animeexplorer.animeexplorer.service;

import com.animeexplorer.animeexplorer.dto.request.UpdateUserRequestModal;
import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.entity.UserBean;

public interface UserService {
    boolean createUser(UserCreationRequestModel requestModel) throws Exception;
    UserBean checkUserLogin(UserLoginRequestModel requestModel) throws Exception;
    UserBean updateUserProfile(String userId, UpdateUserRequestModal requestModel) throws Exception;
}
