using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;
public class GetCourses
{

    public class Query : IRequest<List<Course>> { }
  

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Course>>
    {
        public async Task<List<Course>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Courses.ToListAsync(cancellationToken);
        }
    }

}