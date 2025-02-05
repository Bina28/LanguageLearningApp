
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace AspNet.Shared;

public class RegisterViewModel
{
	[Required]
	[StringLength(50)]
	[EmailAddress]
	public string Email { get; set; } = string.Empty;

	[Required]
	[StringLength(50, MinimumLength =5)]
	public string Password { get; set; } = string.Empty;
	public string ConfirmPassword { get; set; } = string.Empty;

}
