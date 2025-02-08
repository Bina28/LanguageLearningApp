using AspNet.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AspNet.Api.Services;

public class UserService : IUserService
{
	private UserManager<IdentityUser> _userManager;
	private IConfiguration _configuration;
	private IMailService _mailService;
	public UserService(UserManager<IdentityUser> userManager, IConfiguration configuration, IMailService mailService)
	{
		_userManager = userManager;
		_configuration = configuration;
		_mailService = mailService;
	}

	public async Task<UserManagerResponse> ConfirmEmailAsync(string userId, string token)
	{
		var user = await _userManager.FindByIdAsync(userId);
		if (user == null)
		{
			return new UserManagerResponse
			{
				Message = "User not found",
				IsSuccess = false,
			};
		}

		var decodedToken = WebEncoders.Base64UrlDecode(token);
		string normalToken = Encoding.UTF8.GetString(decodedToken);

		var result = await _userManager.ConfirmEmailAsync(user, normalToken);

		if (result.Succeeded)
		{
			return new UserManagerResponse
			{
				Message = "Email confirmed successfully",
				IsSuccess = true,
			};
		}

		return new UserManagerResponse
		{
			Message = "Email didn't confirm",
			IsSuccess = false,
			Errors = result.Errors.Select(e => e.Description)
		};
	}

	public async Task<UserManagerResponse> ForgetPasswordAsync(string email)
	{
		var user = await _userManager.FindByEmailAsync(email);
		if(user == null)
		{
			return new UserManagerResponse
			{
				Message = "No user associated withthe email",
				IsSuccess = false,
				
			};
					
		}

var token= await _userManager.GeneratePasswordResetTokenAsync(user);
		var encodedToken = Encoding.UTF8.GetBytes(token);
		var validToken = WebEncoders.Base64UrlEncode(encodedToken);

		string url = $"{_configuration["AppUrl"]}/ResetPassword?email={email}&token={validToken}";
		await _mailService.SendEmailAsync(email, "Reset Password", "<h1>Follow the instructions to reset your password</h1>" +
		 $"<p> To reset your password <a href='{url}'> Click here </a></p>");

		return new UserManagerResponse
		{
			Message = "Reset password URL  has been sent to the email susseccfully!",
			IsSuccess = true,

		};
	}

	public async Task<UserManagerResponse> LoginUserAsync(LoginViewModel model)
	{
		var user = await _userManager.FindByEmailAsync(model.Email);

		if (user == null)
		{
			return new UserManagerResponse
			{
				Message = "There is no user with that Email address",
				IsSuccess = false,
			};
		}

		var result = await _userManager.CheckPasswordAsync(user, model.Password);
		if (!result)
		{
			return new UserManagerResponse
			{
				Message = "Invalid password",
				IsSuccess = false,
			};
		}

		var claims = new[]
		{
			new Claim("Email", model.Email),
			new Claim(ClaimTypes.NameIdentifier, user.Id),
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

		var token = new JwtSecurityToken(
			issuer: _configuration["AuthSettings:Issuer"],
			audience: _configuration["AuthSettings:Audience"],
			claims: claims,
			expires: DateTime.Now.AddDays(30),
			signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
			);

		var tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
		return new UserManagerResponse
		{
			Message = tokenAsString,
			IsSuccess = true,
			ExpireDate = token.ValidTo,
		};
	}

	public async Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model)
	{
		if(model== null)
		{
			throw new NullReferenceException("Register model is null");
		}

		if (model.Password != model.ConfirmPassword)
			return new UserManagerResponse
			{
				Message = "Confirmed password doesn't match the password",
				IsSuccess = false,
			};

		var identifyUser = new IdentityUser
		{
			Email = model.Email,
			UserName = model.Email
		};

		var result = await _userManager.CreateAsync(identifyUser, model.Password);

		if (result.Succeeded)
		{
			var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(identifyUser);
			var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
			var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

			string url = $"{_configuration["AppUrl"]}/api/auth/confirmemail?userid={identifyUser.Id}&token={validEmailToken}";

			await _mailService.SendEmailAsync(identifyUser.Email, "Confirm your email", $"<h1>Welcome to Auth page</h1>" +
				$"<p> Please confirm your email by <href='{url}' clicking here</a></p>");

			return new UserManagerResponse
			{
				Message = "User created successfully",
				IsSuccess = true,
			};
				
		}

		return new UserManagerResponse
		{
			Message = "User wasn't created",
			IsSuccess = false,
			Errors = result.Errors.Select(e => e.Description)
		};
	}

}
