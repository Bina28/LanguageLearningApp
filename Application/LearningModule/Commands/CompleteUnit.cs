using Application.Core;
using MediatR;
using Persistence;

namespace Application.LearningModule.Commands;

public class CompleteUnit
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string UserId { get; set; }
        public required int CorrectAnswers { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (request.CorrectAnswers < 3)
                return Result<Unit>.Failure("Not enough correct answers", 400);

            var user = await context.Users.FindAsync([request.UserId, cancellationToken], cancellationToken: cancellationToken);

            if (user == null)
                return Result<Unit>.Failure("User not found", 404);

            user.CompletedUnits++;
            await context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
