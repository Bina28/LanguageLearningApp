using Application.Core;
using Application.Dtos;
using Persistence;

namespace Application.UserModule.Commands;

using MediatR;

public class UpdateUser
{
    public class Command : IRequest<Result<Unit>>
    {     public required string UserId { get; set; } 
        public required UserDto UserDto { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId, cancellationToken], cancellationToken: cancellationToken);
            if (user is null)
                return Result<Unit>.Failure("User not found", 404);


            user.Email = request.UserDto.Email;
            user.DisplayName = request.UserDto.DisplayName;

            await context.SaveChangesAsync(cancellationToken);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
