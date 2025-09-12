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

    [HttpGet("{courseId}/cards")]
    public async Task<ActionResult<List<CardsDto>>> GetCards(int courseId)
    {
        return await Mediator.Send(new GetCards.Query { Id = courseId });
    }


    [HttpGet("{userId}/last-completed")]
    public async Task<ActionResult<int>> GetLastCompletedCourse(string userId)
    {
        var result = await Mediator.Send(new GetLastCompletedCourse.Query { UserId = userId });
        return Ok(result);
    }


}
