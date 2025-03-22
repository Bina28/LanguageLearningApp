using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models;

namespace WebApi.Dtos;

public class UserCourseDto
{
	public int Id { get; set; }
	public int CourseId { get; set; }
	public DateTime? LastCompletedDay { get; set; }
	public int Attempts { get; set; }
	public bool IsCompleted { get; set; }
	public string CourseTitle { get; set; } = string.Empty;
	public string CourseDescription { get; set; } = string.Empty;
}
