using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IAuthService, AuthService>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
		policy =>
		{
			policy.WithOrigins("http://localhost:3002") // React URL
				  .AllowAnyHeader()
				  .AllowAnyMethod()
			  .AllowCredentials();
		});
});


try
{
	var app = builder.Build();
	app.UseCors(MyAllowSpecificOrigins);
	app.UseSwagger();
	app.UseSwaggerUI();
	app.UseAuthorization();
	app.MapControllers();
	app.Run();
}
catch (Exception ex)
{
	Console.WriteLine($"Application failed to start: {ex.Message}");
}



