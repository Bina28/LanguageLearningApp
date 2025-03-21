﻿using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services;

public class UserService:IUserService
{
	private readonly AppDbContext _context;

	public UserService(AppDbContext context)
	{
		_context = context;
	}
	public async Task UpdateUser(User user)
	{
		_context.Users.Update(user);
		await _context.SaveChangesAsync();
	}

	public async Task<UserProfileDto?> GetUserProfile(int userId)
	{
		var user = await _context.Users.FindAsync(userId);
		if (user == null) return null;

		return new UserProfileDto { Id = user.Id, FullName = user.FullName, Email = user.Email };
	}
}
