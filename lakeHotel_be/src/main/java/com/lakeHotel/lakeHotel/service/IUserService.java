package com.lakeHotel.lakeHotel.service;

import com.lakeHotel.lakeHotel.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUser();
    void deleteUser(String email);
    User getUser(String email);
}
