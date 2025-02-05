using System.ComponentModel.DataAnnotations;

namespace AspNet.Api.Models;

public class User
{
	[Key]
	public int UserId { get; set; }	
	public string FirstName { get; set; } = string.Empty;
	public string LastName { get; set; } = string.Empty;
	public string UserEmail { get; set; } = string.Empty;
	public int UserPhone { get; set; }
	public DateTime CreatedAt { get; set; }
	public DateTime LastLogin { get; set; }
}
