using API.Middleware;
using Application.Core;
using Application.LearningModule.Queries;
using Application.Validators;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
  x.RegisterServicesFromAssemblyContaining<GetCourses.Handler>();
  x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddTransient<ExeptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
  opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();
builder.Services.AddControllers(opt =>
{
  var policy = new AuthorizationPolicyBuilder()
      .RequireAuthenticatedUser()
      .Build();
  opt.Filters.Add(new AuthorizeFilter(policy));
});


var app = builder.Build();



app.UseMiddleware<ExeptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader()
.AllowCredentials()
.AllowAnyMethod()
.WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();


app.Run();
