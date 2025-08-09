using System.ComponentModel.DataAnnotations;


namespace Domain;

public class Course
{
	[Key]
	public int CourseId { get; set; }

	[Required]
	public string Title { get; set; } 

	[Required]
	public string Description { get; set; } 


	public List<CourseCard> Cards { get; set; } = new();
	public List<UserCourse> UserCourses { get; set; } = new();
}
