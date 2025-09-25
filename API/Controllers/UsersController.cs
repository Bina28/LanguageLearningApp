using Application.Dtos;
using Application.LearningModule.Commands;

using Application.UserModule.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UsersController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        var users = await Mediator.Send(new GetUsers.Query());
        return Ok(users);
    }


    [HttpGet("{userId}/courses")]
    public async Task<ActionResult<List<UserCourseDto>>> GetUserCourses(string userId)
    {
        return await Mediator.Send(new GetUserCourseInfo.Query { UserId = userId });
    }

    [HttpPost("complete-course")]
    public async Task<ActionResult> CompleteCourse([FromBody] CompleteCourse.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

}
