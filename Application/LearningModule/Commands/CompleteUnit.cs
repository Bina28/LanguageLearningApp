using MediatR;
using Persistence;

namespace Application.LearningModule.Commands;

public class CompleteUnit
{
    public class Command : IRequest<bool>
    {
        public required string UserId { get; set; }
        public required int CorrectAnswers { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken: cancellationToken);
            if (user == null || request.CorrectAnswers < 3) return false;
                                      
            user.CompletedUnits++;
            await context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
