using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;

public class GetLastCompletedCourse
{
    public class Query : IRequest<Result<int>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<int>>
    {
        public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId, cancellationToken], cancellationToken: cancellationToken);

            if (user == null)
                return Result<int>.Failure("User not found", 404);

            var lastCompletedCourse = await context.UserCourses
                .Where(uc => uc.UserId == request.UserId && uc.IsCompleted)
                 .OrderByDescending(uc => uc.CourseId)
                .Select(uc => uc.CourseId)
                .FirstOrDefaultAsync(cancellationToken);


            return Result<int>.Success(lastCompletedCourse);
        }
    }
}
