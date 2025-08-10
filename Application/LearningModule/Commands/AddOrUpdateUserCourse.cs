using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Commands;

public class AddOrUpdateUserCourse: IRequest<Unit>
{
    public required string UserId { get; set; }
    public int CourseId { get; set; }
    public bool IsCompleted { get; set; }

    public class Handler(AppDbContext context) : IRequestHandler<AddOrUpdateUserCourse, Unit>
    {
        public async Task<Unit> Handle(AddOrUpdateUserCourse request, CancellationToken cancellationToken)
        {
            var userCourse = await context.UserCourses
                .FirstOrDefaultAsync(uc => uc.Id == request.UserId && uc.CourseId == request.CourseId, cancellationToken);
            if (userCourse == null)
            {
                userCourse = new UserCourse
                {
                    Id = request.UserId,
                    CourseId = request.CourseId,
                    LastCompletedDay = request.IsCompleted ? DateTime.UtcNow : null,
                    Attempts = 1,
                    IsCompleted = request.IsCompleted
                };
                context.UserCourses.Add(userCourse);
            }
            else
            {
                userCourse.LastCompletedDay = request.IsCompleted ? DateTime.UtcNow : null;
                userCourse.Attempts++;
                userCourse.IsCompleted = request.IsCompleted;
            }
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}

