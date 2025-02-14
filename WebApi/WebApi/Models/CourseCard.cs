using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models;

public class CourseCard
{
	[Key]
	public int Id { get; set; }

	[Required]
	public int CourseId { get; set; } // Foreign Key

	[Required]
	public string EnglishText { get; set; } = string.Empty;	

	[Required]
	public string NorwegianText { get; set; } = string.Empty;

	// Navigation Property
	[ForeignKey("CourseId")]
	public Course Course { get; set; }
}
