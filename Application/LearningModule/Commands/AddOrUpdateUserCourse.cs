using AutoMapper;
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

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<AddOrUpdateUserCourse, Unit>
    {
        public async Task<Unit> Handle(AddOrUpdateUserCourse request, CancellationToken cancellationToken)
        {
            var userCourse = await context.UserCourses
                .FirstOrDefaultAsync(uc => uc.Id == request.UserId && uc.CourseId == request.CourseId, cancellationToken);
            if (userCourse == null)
            {
                userCourse = mapper.Map<UserCourse>(request);
                userCourse.Attempts = 1;
                context.UserCourses.Add(userCourse);
            }
            else
            {
                mapper.Map(request, userCourse); 
                userCourse.Attempts++;
            }
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}

