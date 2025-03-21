﻿using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos;

using WebApi.Models;

namespace WebApi.Services;

public class AuthService : IAuthService
{
	private readonly AppDbContext _context;

	public AuthService(AppDbContext context)
	{
		_context = context;
	}

	public async Task<bool> RegisterUser(RegisterDto dto)
	{
		if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
			return false; // Email already exists

		var user = new User
		{
			FullName = dto.FullName,
			Email = dto.Email,
			PasswordHash = HashPassword(dto.Password),
			LastLoginDate = DateTime.Now
		};

		_context.Users.Add(user);
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<User?> ValidateUser(LoginDto dto)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
		if (user == null) return null;


		if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
			return null;


		user.LastLoginDate = DateTime.Now;
		_context.Users.Update(user);
		await _context.SaveChangesAsync();

		return user;
	}



	private static string HashPassword(string password)
	{
		return BCrypt.Net.BCrypt.HashPassword(password);
	}


}
