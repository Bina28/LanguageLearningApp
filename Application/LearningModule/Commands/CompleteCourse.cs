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
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

            if (user == null)
                return Result<Unit>.Failure("User not found", 404);

            var userCourse = await context.UserCourses
                .FirstOrDefaultAsync(uc => uc.UserId == request.UserId && uc.CourseId == request.CourseId, cancellationToken);

            bool completed = request.CorrectAnswers > 3;

            if (userCourse == null)
            {
                userCourse = new UserCourse
                {
                    UserId = request.UserId,
                    CourseId = request.CourseId,
                    IsCompleted = completed,
                    Attempts = 1,
                    LastCompletedDay = DateTime.UtcNow
                };
                context.UserCourses.Add(userCourse);

                if (completed)
                    user.CompletedUnits++;
            }
            else
            {
                userCourse.Attempts++;
                userCourse.LastCompletedDay = DateTime.UtcNow;

                if (completed && !userCourse.IsCompleted)
                {
                    userCourse.IsCompleted = true;
                    user.CompletedUnits++;
                }
            }
            Console.WriteLine($"UserCourse: {userCourse.UserId}-{userCourse.CourseId}, Attempts={userCourse.Attempts}, IsCompleted={userCourse.IsCompleted}");
Console.WriteLine($"User.CompletedUnits: {user.CompletedUnits}");

            try
            {
                await context.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex.InnerException?.Message);
                throw;
            }


            return Result<Unit>.Success(Unit.Value);
        }
    }
}