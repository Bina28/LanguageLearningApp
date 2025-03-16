using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services;

public interface ILearningService
{
	Task<PaginatedCourseList<Course>> GetCourses(int pageIndex, int pageSize);
	Task<List<CardsDto>> GetCards(int id);
	Task<bool> CompleteUnit(int id, int correctAnswers);
	Task<int> GetCompletedUnits(int userId);
}
