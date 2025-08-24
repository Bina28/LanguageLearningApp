using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain;

public class CourseCard{

	public int Id { get; set; }
	public int CourseId { get; set; } // Foreign Key
	public required string EnglishText { get; set; } 
	public required string NorwegianText { get; set; } 
	// Navigation Property
	[ForeignKey("CourseId")]
	public  Course Course { get; set; }
}
