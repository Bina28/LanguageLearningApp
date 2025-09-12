using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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


    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<UserCourseDto>>
    {
        public async Task<List<UserCourseDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var userCourses = await context.UserCourses
     .Include(uc => uc.Course)
     .Where(uc => uc.UserId == request.UserId)
     .ProjectTo<UserCourseDto>(mapper.ConfigurationProvider)
     .ToListAsync(cancellationToken);
            return userCourses;
        }

    }
}
