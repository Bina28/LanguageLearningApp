using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AuthModule.Commands;

public class RegisterUser
{
    public class Command : IRequest<string>
    {
        public required RegisterDto Dto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {

            if (await context.Users.AnyAsync(u => u.Email == request.Dto.Email, cancellationToken))
            { throw new InvalidOperationException("User already exists");}   


            var user = mapper.Map<User>(request.Dto);
user.Id = Guid.NewGuid().ToString();
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Dto.Password);
            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);
            return user.Id;
        }
    }
}

