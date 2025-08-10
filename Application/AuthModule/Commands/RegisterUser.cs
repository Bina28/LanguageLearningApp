using Application.Dtos;
using AutoMapper;
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

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, User>
    {
        public async Task<User> Handle(Command request, CancellationToken cancellationToken)
        {

            if (await context.Users.AnyAsync(u => u.Email == request.Dto.Email, cancellationToken))
                return null;


            var user = mapper.Map<User>(request.Dto);


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

