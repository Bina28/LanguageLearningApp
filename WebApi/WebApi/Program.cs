using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
	.ConfigureApiBehaviorOptions(options =>
	{
		options.SuppressModelStateInvalidFilter = true;
	});


builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILearningService, LearningService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAnyOrigin", builder =>
	{
		builder.WithOrigins("http://localhost:3000")	
			   .AllowAnyHeader() 
			   .AllowAnyMethod(); 
	});
});
             
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage(); // Shows detailed errors
}


app.UseCors("AllowAnyOrigin");

app.UseStatusCodePages(); // Handles 400-599 errors
app.UseExceptionHandler("/error"); // Custom error handler

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();


app.MapControllers();

app.Map("/error", (HttpContext context) =>
{
	var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
	return Results.Problem(
		title: "An error occurred",
		detail: exception?.Message,
		statusCode: StatusCodes.Status500InternalServerError
	);
});

app.Run();
