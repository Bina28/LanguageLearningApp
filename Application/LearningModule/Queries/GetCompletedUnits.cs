using MediatR;
using Persistence;

namespace Application.LearningModule.Queries;

public class GetCompletedUnits
{
    public class Query : IRequest<int>
    {
        public int UserId { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, int>
    {
        
        public async Task<int> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);
            return user?.CompletedUnits ?? 0;
        }
    }
}
