namespace AspNet.Api.Models;

public class UserManagerResponse
{
	public string Message { get; set; } = string.Empty;
	public bool IsSuccess { get; set; }

	public IEnumerable<string> Errors { get; set; }
	public DateTime? ExpireDate { get; set; }
}
