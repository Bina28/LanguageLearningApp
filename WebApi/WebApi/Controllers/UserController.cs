using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
	private readonly IUserService _userService;

	public UserController(IUserService userService)
	{
		_userService = userService;
	}

	[HttpPut("update")]
	public async Task<IActionResult> UpdateUser([FromBody] User user)
	{
		if (user == null)
		{
			return BadRequest("User cannot be null.");
		}
		var result = await _userService.UpdateUser(user);
		if (!result.Success)
		{
			return BadRequest(result.Message);
		}
		return Ok(result.Message);
	}

}
