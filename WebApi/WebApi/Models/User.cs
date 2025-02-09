﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class User
{
	public int Id { get; set; }

	[Required, MaxLength(100)]
	public string FullName { get; set; } = string.Empty;

	[Required, MaxLength(100)]
	public string Email { get; set; } = string.Empty;

	[Required]
	public string PasswordHash { get; set; } = string.Empty;
	
	public DateTime? LastLoginDate { get; set; }
}
