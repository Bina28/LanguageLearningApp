using MediatR;
using Persistence;

namespace Application.LearningModule.Commands;

public class CompleteUnit
{
    public class Command : IRequest<bool>
    {
        public required int UserId {get; set;}
        public required int CorrectAnswers { get; set; }
}

    public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken: cancellationToken);
            if (user == null) return false;
            if (request.CorrectAnswers < 3)
            {
                return false;
            }
            if (user.CompletedUnits == user.CompletedUnits)
            {
                user.CompletedUnits++;
                await context.SaveChangesAsync(cancellationToken);
            }
            return true;
        }
    }
}
