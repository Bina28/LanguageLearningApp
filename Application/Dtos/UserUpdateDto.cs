using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos;

public class UserUpdateDto
{
  public string Id { get; set; } = string.Empty;
	public string FullName { get; set; }= string.Empty;
	public  string Email { get; set; } = string.Empty;

}
