using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers;


	[Route("api/auth")]
	[ApiController]
	public class AuthController : ControllerBase
	{
	private readonly IAuthService _authService; 

	public AuthController(IAuthService authService) 
	{
		_authService = authService;
	}

	[HttpPost("register")]
		public async Task<IActionResult> Register(RegisterDto dto)
		{
			var success = await _authService.RegisterUser(dto);
			if (!success) return BadRequest("Email already in use.");

			return Ok("User registered successfully.");
		}

	[HttpPost("login")]
	public async Task<IActionResult> Login(LoginDto dto)
	{
		var user = await _authService.ValidateUser(dto);

		if (user == null)
			return Unauthorized("Invalid email or password.");

	
		if (user.LastLoginDate.HasValue && (DateTime.UtcNow - user.LastLoginDate.Value).TotalHours > 24)
		{
			return Unauthorized("Your last login was more than 24 hours ago. Please log in again.");
		}

		user.LastLoginDate = DateTime.Now;


		await _authService.UpdateUser(user);

		return Ok(new
		{
			userId = user.Id,
			email = user.Email,
			fullName = user.FullName,
			lastLoginDate = user.LastLoginDate
		});
	}


	[HttpGet("profile/{userId}")]
		public async Task<IActionResult> GetProfile(int userId)
		{
			var profile = await _authService.GetUserProfile(userId);
			if (profile == null) return NotFound();

			return Ok(profile);
		}


	[HttpGet("courses")]
	public async Task<IActionResult> GetCourses()
	{
		var courses = await _authService.GetCourses();
		return Ok(courses);
	}

	[HttpGet("cards/{id}")]
	public async Task<IActionResult> GetCards(int id)
	{
		var cards = await _authService.GetCards(id);
		return Ok(cards);
	}
}


