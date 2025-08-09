namespace Application.Dtos;

public class CardsDto
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public required string EnglishText { get; set; }
    public required string NorwegianText { get; set; }
}
