using Application.AuthModule.Commands;
using Application.Dtos;
using Application.UserModule.Commands;
using Application.UserModule.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

public class UserController(AppDbContext context, IMediator mediator) : BaseApiController
{
    [HttpPut]
    public async Task<IActionResult> UpdateUser(User user)
    {
        await mediator.Send(new UpdateUser.Command { User = user });
        return NoContent();
    }


    [HttpGet("{userId}")]
    public async Task<ActionResult<List<UserCourseDto>>> GetUserCourses(string userId)
    {
        return await mediator.Send(new GetUserCourseInfo.Query { UserId = userId });
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        var users = await mediator.Send(new GetUsers.Query());
        return Ok(users);
    }

}
