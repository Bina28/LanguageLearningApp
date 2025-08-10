using Application.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AuthModule.Commands;

public class RegisterUser
{
    public class Command : IRequest<User>
    {
        public required RegisterDto Dto { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, User>
    {
        public async Task<User> Handle(Command request, CancellationToken cancellationToken)
        {

            if (await context.Users.AnyAsync(u => u.Email == request.Dto.Email, cancellationToken: cancellationToken))
                return null;


            var user = new User
            {
                FullName = request.Dto.FullName,
                Email = request.Dto.Email,
                PasswordHash = HashPassword(request.Dto.Password),
                LastLoginDate = DateTime.Now
            };


            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);
            return user;
        }
        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
    }

