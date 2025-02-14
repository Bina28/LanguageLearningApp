namespace WebApi.Dtos
{
	public class CardsDto
	{
		public int Id { get; set; }
		public int CourseId { get; set; }
		public string EnglishText { get; set; } = string.Empty;
		public string NorwegianText { get; set; } = string.Empty;
	}
}
