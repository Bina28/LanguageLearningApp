﻿using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services;

public interface IAuthService
{
	Task<bool> RegisterUser(RegisterDto dto);
	Task<User> ValidateUser(LoginDto dto);



}
