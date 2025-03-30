using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILearningService, LearningService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var frontendUrl = builder.Configuration["FRONTEND_URL"] ?? "http://localhost:3000";

builder.Services.AddCors(options =>
{
	options.AddPolicy("CorsPolicy", builder =>
		builder.WithOrigins(frontendUrl)
			   .AllowAnyMethod()
			   .AllowAnyHeader());
});

var app = builder.Build();


app.UseCors("CorsPolicy");

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();


app.MapControllers();


app.Run();
