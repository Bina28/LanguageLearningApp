using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class Course
{
	[Key]
	public int CourseId { get; set; }

	[Required]
	public string Title { get; set; } = string.Empty;

	[Required]
	public string Description { get; set; } =string.Empty;

	// Navigation Property
	public List<CourseCard> Cards { get; set; } = new();
	public List<UserCourse> UserCourses { get; set; } = new();
}
