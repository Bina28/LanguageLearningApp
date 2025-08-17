using System.ComponentModel.DataAnnotations;

namespace Domain;


public class User
{
	public required string Id { get; set; } 

	[Required, MaxLength(100)]
	public required string FullName { get; set; }

	[Required, MaxLength(100)]
	public required string Email { get; set; } 

	[Required]
	public required string PasswordHash { get; set; }

	public int CompletedUnits { get; set; }

	public DateTime? LastLoginDate { get; set; }
	public List<UserCourse> UserCourses { get; set; } = [];
}
