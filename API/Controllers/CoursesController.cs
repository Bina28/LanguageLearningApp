using Application.Dtos;
using Application.LearningModule.Commands;
using Application.LearningModule.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;


namespace API.Controllers;

public class CoursesController(AppDbContext context, IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        return await mediator.Send(new GetCourses.Query());
    }


    [HttpGet("cards/{id}")]
    public async Task<ActionResult<List<CardsDto>>> GetCards(int id)
    {
        return await mediator.Send(new GetCards.Query { Id = id });
    }
    public async Task<ActionResult<bool>> CompleteUnit([FromBody] UnitCompletionDto request)
    {
        var command = new CompleteUnit.Command
        {
            UserId = request.Id,
            CorrectAnswers = request.CorrectAnswers
        };

        return await mediator.Send(command);
    }


    [HttpGet("progress/{userId}")]
    public async Task<ActionResult<int>> GetCompletedUnits(int userId)
    {
        return await mediator.Send(new GetCompletedUnits.Query { UserId = userId });
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<Course>>> SearchCourses(string? searchQuery)
    {
        var courses = await mediator.Send(new SearchCourses.Query { SearchQuery = searchQuery });

        return Ok(courses);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdateUserCourse([FromBody] AddOrUpdateUserCourse command)
    {
        await mediator.Send(command);
        return NoContent();
    }

 
}
