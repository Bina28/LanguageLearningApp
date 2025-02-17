using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services;

public interface IAuthService
{
	Task<bool> RegisterUser(RegisterDto dto);
	Task<User> ValidateUser(LoginDto dto);
	Task<UserProfileDto> GetUserProfile(int userId);
	Task UpdateUser(User user);

	Task<List<Course>> GetCourses();
	Task<List<CardsDto>> GetCards(int id);
	Task<bool> CompleteUnit(int id, int correctAnswers);
	Task<int> GetCompletedUnits(int userId);
}
