using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain;

public class CourseCard
{
	[Key]
	public int Id { get; set; }

	[Required]
	public int CourseId { get; set; } // Foreign Key

	[Required]
	public required string EnglishText { get; set; } 

	[Required]
	public required string NorwegianText { get; set; } 

	// Navigation Property
	[ForeignKey("CourseId")]
	public required Course Course { get; set; }
}
