using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;

public class SearchCourses
{
    public class Query : IRequest<List<Course>>
    {
        public string? SearchQuery { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Course>>
    {
        public async Task<List<Course>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Courses.AsQueryable();
            if (!string.IsNullOrEmpty(request.SearchQuery))
            {
                query = query.Where(c => c.Title.Contains(request.SearchQuery) || c.Description.Contains(request.SearchQuery));
            }
            return await query.ToListAsync(cancellationToken);
        }
    }
}
