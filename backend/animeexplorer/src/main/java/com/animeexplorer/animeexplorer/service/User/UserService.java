package com.animeexplorer.animeexplorer.service.User;

import com.animeexplorer.animeexplorer.dto.request.UpdateUserRequestModal;
import com.animeexplorer.animeexplorer.dto.request.UserCreationRequestModel;
import com.animeexplorer.animeexplorer.dto.request.UserLoginRequestModel;
import com.animeexplorer.animeexplorer.entity.UserBean;

public interface UserService {
    boolean createUser(UserCreationRequestModel requestModel);
    UserBean checkUserLogin(UserLoginRequestModel requestModel);
    UserBean updateUserProfile(String userId, UpdateUserRequestModal requestModel);
}
