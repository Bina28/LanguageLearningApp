using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Commands;
public class CompleteCourse
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string UserId { get; set; }
        public required int CourseId { get; set; }
        public required int CorrectAnswers { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (request.CorrectAnswers < 3)
                return Result<Unit>.Failure("Not enough correct answers", 400);

            var user = await context.Users.FindAsync([request.UserId], cancellationToken);
            if (user == null)
                return Result<Unit>.Failure("User not found", 404);

            var userCourse = await context.UserCourses
              .FirstOrDefaultAsync(uc => uc.UserId == request.UserId && uc.CourseId == request.CourseId, cancellationToken);

            if (userCourse == null)
            {
                userCourse = new UserCourse
                {
                    UserId = request.UserId,
                    CourseId = request.CourseId,
                    IsCompleted = true,
                    Attempts = 1,
                    LastCompletedDay = DateTime.UtcNow
                };
                context.UserCourses.Add(userCourse);
            }
            else
            {
                userCourse.IsCompleted = true;
                userCourse.Attempts++;
                userCourse.LastCompletedDay = DateTime.UtcNow;
            }

            user.CompletedUnits++;

            await context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
