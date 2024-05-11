package com.lakeHotel.lakeHotel.service;

import com.lakeHotel.lakeHotel.model.Role;
import com.lakeHotel.lakeHotel.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUserFromRole(Long roleId);
}
