
using Application.Dtos;
using Application.UserModule.Commands;
using Application.UserModule.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> CreateUser(CreateUserDto createUserDto)
    {
        return HandleResult(await Mediator.Send(new CreateUser.Command { CreateUserDto = createUserDto }));

    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile(string userId)
    {
        return HandleResult(await Mediator.Send(new GetUserProfile.Query { UserId = userId }));
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginDto loginDto)
    {
        return HandleResult(await Mediator.Send(new ValidateUser.Command { LoginDto = loginDto }));

    }

}
