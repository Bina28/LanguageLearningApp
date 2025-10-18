using Application.Core;
using Application.Dtos;
using Application.LearningModule.Commands;
using Application.LearningModule.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class CoursesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PageList<Course, int?>>> GetCourses(int? cursor)  
    {
        return HandleResult(await Mediator.Send(new GetCourses.Query { Cursor = cursor }));
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
