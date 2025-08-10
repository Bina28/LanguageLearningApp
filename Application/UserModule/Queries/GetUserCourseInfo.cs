using Application.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserModule.Queries;

public class GetUserCourseInfo
{
    public class Query : IRequest<List<UserCourseDto>>
    {
  public required string UserId { get; set; }
    }


    public class Handler(AppDbContext context) : IRequestHandler<Query, List<UserCourseDto>>
    {
        public async Task<List<UserCourseDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userCourses = await context.UserCourses
                .Include(uc => uc.Course)
                .Where(uc => uc.Id == request.UserId)
                .Select(uc => new UserCourseDto
                {
                    Id = uc.Id,
                    CourseId = uc.CourseId,
                    CourseTitle = uc.Course.Title,
                    CourseDescription = uc.Course.Description,
                    LastCompletedDay = uc.LastCompletedDay,
                    Attempts = uc.Attempts,
                    IsCompleted = uc.IsCompleted
                })
                .ToListAsync(cancellationToken);

            return userCourses;
        }

    }
}
