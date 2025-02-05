using AspNet.Api.Models;
using AspNet.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;

namespace AspNet.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{

	private IUserService _userService;
	private IMailService _mailService;

	public AuthController(IUserService userService, IMailService mailService)
	{
		_userService = userService;
		_mailService = mailService;
	}


	// /api/auth/register
	[HttpPost("Register")]
	public async Task<IActionResult> RegisterAsync([FromBody] RegisterViewModel model)
	{
		if (ModelState.IsValid)
		{
			var result = await _userService.RegisterUserAsync(model);

			if (result.IsSuccess)
				return Ok(result);

			return BadRequest(result);
		}

		return BadRequest("Some properties aren't valid");

	}

	[HttpPost("Login")]
	public async Task<IActionResult> LoginAsync([FromBody] LoginViewModel model)
	{
		if (ModelState.IsValid)
		{
			var result = await _userService.LoginUserAsync(model);
			if (result.IsSuccess)
			{
				await _mailService.SendEmailAsync(model.Email, "New Login", "<h1>Hei, new login to your account noticed</h1><p>New login to your account at " + DateTime.Now + "</p>");
				return Ok(result);
			}

			return BadRequest(result);
		}

		return BadRequest("Some properties aren't valid");
	}



	[HttpPost("ConfirmEmail")]
	public async Task<IActionResult> ConfirmEmail(string userId, string token)
	{
		if(string.IsNullOrWhiteSpace(userId) || string.IsNullOrEmpty(token))
		{
			return NotFound();
		}

		var result = await _userService.ConfirmEmailAsync(userId, token);

		if (result.IsSuccess)
		{
			//TODO
		}

		return BadRequest(result);
	}
}
