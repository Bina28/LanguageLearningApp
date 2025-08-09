using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class User
{
	public string Id { get; set; } = Guid.NewGuid().ToString();

	[Required, MaxLength(100)]
	public string FullName { get; set; }

	[Required, MaxLength(100)]
	public string Email { get; set; } 

	[Required]
	public string PasswordHash { get; set; }

	public int CompletedUnits { get; set; }

	public DateTime? LastLoginDate { get; set; }
	public List<UserCourse> UserCourses { get; set; } = new();
}
