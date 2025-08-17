using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos;

public class UserUpdateDto
{

	public required string Id { get; set; } 

	[Required, MaxLength(100)]
	public required string FullName { get; set; }

	[Required, MaxLength(100)]
	public required string Email { get; set; } 

}
