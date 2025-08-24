using Application.Dtos;
using Application.LearningModule.Commands;
using Application.LearningModule.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class CoursesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PaginatedCoursesDto>> GetCourses(
      [FromQuery] string? searchQuery,
      [FromQuery] int page = 1,
      [FromQuery] int pageSize = 10)
    {
        var result = await Mediator.Send(new SearchCourses.Query
        {
            SearchQuery = searchQuery,
            Page = page,
            PageSize = pageSize
        });

        return Ok(result);
    }

    [HttpGet("cards/{id}")]
    public async Task<ActionResult<List<CardsDto>>> GetCards(int id)
    {
        return await Mediator.Send(new GetCards.Query { Id = id });
    }

    [HttpPost("completeunit")]
    public async Task<ActionResult> CompleteUnit([FromBody] UnitCompletionDto request)
    {
        var command = new CompleteUnit.Command
        {
            UserId = request.Id,
            CorrectAnswers = request.CorrectAnswers
        };

        return HandleResult(await Mediator.Send(command));
    }


    [HttpGet("progress/{userId}")]
    public async Task<ActionResult<int>> GetCompletedUnits(string userId)
    {
        return HandleResult(await Mediator.Send(new GetCompletedUnits.Query { UserId = userId }));
    }

    // [HttpGet("search")]
    // public async Task<ActionResult<List<Course>>> SearchCourses(string? searchQuery)
    // {
    //     var courses = await Mediator.Send(new SearchCourses.Query { SearchQuery = searchQuery });

    //     return Ok(courses);
    // }

    [HttpPut]
    public async Task<IActionResult> AddOrUpdateUserCourse([FromBody] AddOrUpdateUserCourse command)
    {
        await Mediator.Send(command);
        return NoContent();
    }


}
