

namespace AspNet.Shared;

public class UserManagerResponse
{
	public string Message { get; set; } = string.Empty;
	public bool IsSuccess { get; set; }

	public IEnumerable<string> Errors { get; set; } 
}
