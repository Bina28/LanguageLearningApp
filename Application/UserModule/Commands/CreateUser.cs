using Application.Core;
using Application.Dtos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserModule.Commands;

public class CreateUser
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateUserDto CreateUserDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {

            if (await context.Users.AnyAsync(u => u.Email == request.CreateUserDto.Email, cancellationToken))
            { throw new InvalidOperationException("User already exists"); }

            var user = mapper.Map<User>(request.CreateUserDto);
            user.Id = Guid.NewGuid().ToString();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.CreateUserDto.Password);
            context.Users.Add(user);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Failed to regester the user", 400);
            return Result<string>.Success(user.Id);
        }
    }
}

