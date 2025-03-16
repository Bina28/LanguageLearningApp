using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers;



[Route("api/learning")]
[ApiController]
public class LearningController: ControllerBase
{
	private readonly ILearningService _learningService;

	public LearningController(ILearningService learningService)
	{
		_learningService = learningService;
	}

	[HttpGet("courses")]
	public async Task<ActionResult<ApiResponse>> GetCourses(int pageIndex = 1, int pageSize = 10)
	{
		var courses = await _learningService.GetCourses(pageIndex, pageSize);
		return new ApiResponse(true, null, courses);
	}

	[HttpGet("cards/{id}")]
	public async Task<ActionResult> GetCards(int id)
	{
		var cards = await _learningService.GetCards(id);
		return Ok(cards);
	}

	[HttpPost("complete")]
	public async Task<ActionResult> CompleteUnit([FromBody] UnitCompletionDto request)
	{
		var success = await _learningService.CompleteUnit(request.Id, request.CorrectAnswers);

		if (!success)
		{
			return BadRequest("You need at least 3 correct answers to proceed.");
		}

		return Ok(new { message = "Unit completed successfully" });
	}

	[HttpGet("progress/{userId}")]
	public async Task<ActionResult> GetCompletedUnits(int userId)
	{
		int completedUnits = await _learningService.GetCompletedUnits(userId);
		return Ok(new { completedUnits });
	}
}
