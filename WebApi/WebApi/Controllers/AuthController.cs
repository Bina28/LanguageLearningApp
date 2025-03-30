using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers;


[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly IAuthService _authService;
	private readonly IUserService _userService;


	public AuthController(IAuthService authService, IUserService userService)
	{
		_authService = authService;
		_userService = userService;
	}

	[HttpPost("register")]
	public async Task<ActionResult> Register(RegisterDto dto)
	{
		// Call the RegisterUser service to create a new user
		var user = await _authService.RegisterUser(dto);

		// If the user is null, email already exists
		if (user == null)
			return BadRequest("Email already in use.");

		// Return the user data (id, email, fullName)
		return Ok(new
		{
			id = user.Id,
			email = user.Email,
			fullName = user.FullName
		});
	}


	[HttpPost("login")]
	public async Task<ActionResult> Login(LoginDto dto)
	{
		var user = await _authService.ValidateUser(dto);

		if (user == null)
			return Unauthorized("Invalid email or password.");


		if (user.LastLoginDate.HasValue && (DateTime.UtcNow - user.LastLoginDate.Value).TotalHours > 24)
		{
			return Unauthorized("Your last login was more than 24 hours ago. Please log in again.");
		}

		user.LastLoginDate = DateTime.Now;


		await _userService.UpdateUser(user);

		return Ok(new
		{
			id = user.Id,
			email = user.Email,
			fullName = user.FullName,
			lastLoginDate = user.LastLoginDate
		});
	}


	[HttpGet("profile/{userId}")]
	public async Task<ActionResult> GetProfile(int userId)
	{
		var profile = await _userService.GetUserProfile(userId);
		if (profile == null) return NotFound();

		return Ok(profile);
	}


}


