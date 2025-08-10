using Application.Dtos;
using Application.LearningModule.Commands;
using Application.LearningModule.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class CoursesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        return await Mediator.Send(new GetCourses.Query());
    }


    [HttpGet("cards/{id}")]
    public async Task<ActionResult<List<CardsDto>>> GetCards(int id)
    {
        return await Mediator.Send(new GetCards.Query { Id = id });
    }
    public async Task<ActionResult<bool>> CompleteUnit([FromBody] UnitCompletionDto request)
    {
        var command = new CompleteUnit.Command
        {
            UserId = request.Id,
            CorrectAnswers = request.CorrectAnswers
        };

        return await Mediator.Send(command);
    }


    [HttpGet("progress/{userId}")]
    public async Task<ActionResult<string>> GetCompletedUnits(string userId)
    {
        return await Mediator.Send(new GetCompletedUnits.Query { UserId = userId });
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<Course>>> SearchCourses(string? searchQuery)
    {
        var courses = await Mediator.Send(new SearchCourses.Query { SearchQuery = searchQuery });

        return Ok(courses);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdateUserCourse([FromBody] AddOrUpdateUserCourse command)
    {
        await Mediator.Send(command);
        return NoContent();
    }


}
