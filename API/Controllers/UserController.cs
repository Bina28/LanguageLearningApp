using Application.Dtos;
using Application.UserModule.Commands;
using Application.UserModule.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UserController : BaseApiController
{
    [HttpPut]
    public async Task<IActionResult> UpdateUser( UserUpdateDto user)
    {
        return HandleResult(await Mediator.Send(new UpdateUser.Command { User = user }));

    }


    [HttpGet("{userId}")]
    public async Task<ActionResult<List<UserCourseDto>>> GetUserCourses(string userId)
    {
        return await Mediator.Send(new GetUserCourseInfo.Query { UserId = userId });
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        var users = await Mediator.Send(new GetUsers.Query());
        return Ok(users);
    }

}
