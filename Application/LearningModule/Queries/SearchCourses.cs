using Application.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;

public class SearchCourses
{
    public class Query : IRequest<PaginatedCoursesDto>
    {
        public string? SearchQuery { get; set; }
            public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query, PaginatedCoursesDto>
    {
        public async Task<PaginatedCoursesDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(request.SearchQuery))
            {
                query = query.Where(c =>
                    c.Title.ToLower().Contains(request.SearchQuery) ||
                    c.Description.ToLower().Contains(request.SearchQuery));
            }

            int totalItems = await query.CountAsync(cancellationToken);
            int totalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize);

            var items = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return new PaginatedCoursesDto
            {
                Items = items,
                TotalPages = totalPages
            };
        }
    }
}
