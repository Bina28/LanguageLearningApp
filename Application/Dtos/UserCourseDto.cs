namespace Application.Dtos;

public class UserCourseDto
{
    public required string Id { get; set; }
    public int CourseId { get; set; }
    public DateTime? LastCompletedDay { get; set; }
    public int Attempts { get; set; }
    public bool IsCompleted { get; set; }
    public required string CourseTitle { get; set; } 
    public required string CourseDescription { get; set; }
}
