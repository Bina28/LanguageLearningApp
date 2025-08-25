using Application.Core;
using Application.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserModule.Commands;

public class ValidateUser
{
    public class Command : IRequest<Result<string>>
    {
        public required LoginDto LoginDto { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Email == request.LoginDto.Email, cancellationToken);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.LoginDto.Password, user.PasswordHash))
                return Result<string>.Failure("Invalid email or password", 401);

            user.LastLoginDate = DateTime.Now;
            context.Users.Update(user);
            await context.SaveChangesAsync(cancellationToken);

            return Result<string>.Success(user.Id);
        }
    }
}
