using Application.Core;
using Application.Dtos;
using Persistence;

namespace Application.UserModule.Commands;

using MediatR;

public class UpdateUser
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UserUpdateDto User { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.User.Id, cancellationToken], cancellationToken: cancellationToken);
            if (user is null)
                return Result<Unit>.Failure("User not found", 404);

            user.FullName = request.User.FullName;
            user.Email = request.User.Email;

            await context.SaveChangesAsync(cancellationToken);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
