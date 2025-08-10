using Application.AuthModule.Commands;
using Application.Dtos;
using Application.UserModule.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        await Mediator.Send(new RegisterUser.Command { Dto = registerDto });
        return Ok();

    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetUser(string userId)
    {
        return await Mediator.Send(new GetUserProfile.Query { UserId = userId });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
    {
        await Mediator.Send(new ValidateUser.Command { LoginDto = loginDto });

        return Ok();

    }

}
