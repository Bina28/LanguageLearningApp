using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain;


public class User : IdentityUser
{
	public string? DisplayName { get; set; }
	public string? Bio { get; set; }
	public string? ImageUrl { get; set; }
	public int CompletedUnits { get; set; }
	public DateTime? LastLoginDate { get; set; }
	public List<UserCourse> UserCourses { get; set; } = [];
}
