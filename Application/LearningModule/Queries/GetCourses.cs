using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;
public class GetCourses
{
    private const int MaxPageSize = 50;
    public class Query : IRequest<Result<PageList<Course, int?>>>
    {
        public int? Cursor { get; set; }
        private int _pageSize=10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

    }
  

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<PageList<Course, int?>>>
    {
        public async Task<Result<PageList<Course, int?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Courses
            .OrderBy(x => x.CourseId)
            .AsQueryable();

            if (request.Cursor.HasValue)
            {
                query = query.Where(x => x.CourseId >= request.Cursor.Value);
            }

            var courses = await query
            .Take(request.PageSize + 1)
             .ToListAsync(cancellationToken);

            int? nextCursor = null;
            if (courses.Count > request.PageSize)
            {
                nextCursor = courses.Last().CourseId;
                courses.RemoveAt(courses.Count - 1);
            }

            return Result<PageList<Course, int?>>.Success(
                new PageList<Course, int?>
                {
                    Items = courses,
                    NextCursor = nextCursor
                }
            );

        }
    }

}