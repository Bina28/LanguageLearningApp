namespace Domain;


public class Course
{
	public int CourseId { get; set; }

	public required string Title { get; set; }

	public required string Description { get; set; }

	public List<CourseCard> Cards { get; set; } = [];
	public List<UserCourse> UserCourses { get; set; } = [];
}
