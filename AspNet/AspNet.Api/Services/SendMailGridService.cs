
using SendGrid.Helpers.Mail;
using SendGrid;

namespace AspNet.Api.Services
{
	public class SendMailGridService : IMailService
	{
		private IConfiguration _configuration;
		private readonly string _apiKey;
		public SendMailGridService(IConfiguration configuration)
		{
			_configuration = configuration;
			_apiKey = configuration["SENDGRID_API_KEY"]; 
			if (string.IsNullOrEmpty(_apiKey))
			{
				throw new Exception("SendGrid API Key не найден!");
			}
		}

		public async Task SendEmailAsync(string toEmail, string subject, string content)
		{
			var apiKey = _configuration["SendGridAPIKey"];
			var client = new SendGridClient(apiKey);
			var from = new EmailAddress("dyakovabina@gmail.com", "JWT Auth");
			var to = new EmailAddress(toEmail);
			var msg = MailHelper.CreateSingleEmail(from, to, subject, content, content);
			var response = await client.SendEmailAsync(msg);
		}
	}
}
