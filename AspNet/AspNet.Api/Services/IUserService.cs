
using AspNet.Api.Models;

namespace AspNet.Api.Services;

public interface IUserService
{
	Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);
	Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);
	Task<UserManagerResponse> ConfirmEmailAsync(string userId, string token);
	Task<UserManagerResponse> ForgetPasswordAsync(string email);
}
