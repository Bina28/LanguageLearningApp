﻿namespace WebApi.Dtos;

public class RegisterDto
{
	public string FullName { get; set; } =string.Empty;
	public string Email { get; set; } = string.Empty;
	public string Password { get; set; } = string.Empty;
}
