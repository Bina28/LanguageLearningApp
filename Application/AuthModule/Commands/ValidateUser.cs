using Application.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AuthModule.Commands;

public class ValidateUser
{
    public class Command : IRequest<string>
    {
        public required LoginDto LoginDto { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string?> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Email == request.LoginDto.Email, cancellationToken);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.LoginDto.Password, user.PasswordHash))
                return null;


            if (user.LastLoginDate.HasValue && (DateTime.UtcNow - user.LastLoginDate.Value).TotalHours > 24)
            {
                return null;
            }

            user.LastLoginDate = DateTime.Now;
            context.Users.Update(user);
            await context.SaveChangesAsync(cancellationToken);

            return user.Id;
        }
    }
}
