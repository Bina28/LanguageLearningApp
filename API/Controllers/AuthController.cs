using Application.AuthModule.Commands;
using Application.Dtos;
using Application.UserModule.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

public class AuthController(AppDbContext context, IMediator mediator) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        await mediator.Send(new RegisterUser.Command { Dto = registerDto });
        return Ok();

    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetUser(int userId)
    {
        return await mediator.Send(new GetUserProfile.Query { UserId = userId });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
    {
        await mediator.Send(new ValidateUser.Command { LoginDto = loginDto });

        return Ok();

    }

}
