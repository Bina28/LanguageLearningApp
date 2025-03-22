using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers;


[Route("api/usercourse")]
[ApiController]
public class UserCourseController: ControllerBase
{
	private readonly ILearningService _learningService;
	private readonly IUserService _userService;

	public UserCourseController(ILearningService learningService, IUserService userService)
	{
		_learningService = learningService;
		_userService = userService;
	}

	[HttpPost]
	public async Task<ActionResult> AddOrUpdateUserCourse([FromBody] UserCourseDto dto)
	{
		await _learningService.AddOrUpdateUserCourse(dto.Id, dto.CourseId, dto.IsCompleted);
		return Ok();
	}

	[HttpGet("{userId}")]
	public async Task<ActionResult<List<UserCourseDto?>>> GetUserCourseInfo(int userId)
	{
		var userCourse = await _userService.GetUserCoursesInfo(userId);
		if (userCourse == null || !userCourse.Any()) return NotFound();
		return Ok(userCourse);
	}
}


