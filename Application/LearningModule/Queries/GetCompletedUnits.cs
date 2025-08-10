using MediatR;
using Persistence;

namespace Application.LearningModule.Queries;

public class GetCompletedUnits
{
    public class Query : IRequest<string>
    {
        public required string UserId { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, string>
    {
        
        public async Task<string> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);
         return user != null
            ? user.CompletedUnits.ToString()
            : string.Empty;
        }
    }
}
