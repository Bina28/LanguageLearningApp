using System.ComponentModel.DataAnnotations.Schema;


namespace Domain;

public class CourseCard{

	public int Id { get; set; }
	public int CourseId { get; set; } 
	public required string EnglishText { get; set; } 
	public required string NorwegianText { get; set; } 
	
	[ForeignKey("CourseId")]
	public  Course? Course { get; set; }
}
