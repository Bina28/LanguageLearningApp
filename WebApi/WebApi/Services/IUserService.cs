using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services
{
	public interface IUserService
	{
		Task<UserProfileDto> GetUserProfile(int userId);
		Task UpdateUser(User user);
		Task<List<UserCourseDto?>> GetUserCoursesInfo(int userId);
	}
}
