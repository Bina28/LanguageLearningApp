using Application.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningModule.Queries;

public class GetCards
{
    public class Query : IRequest<List<CardsDto>>
    {
        public required int Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<CardsDto>>
    {
        public async Task<List<CardsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var cards = await context.CourseCards
                .Where(c => c.CourseId == request.Id)
                .Select(c => new CardsDto
                {
                    Id = c.Id,
                    CourseId = c.CourseId,
                    EnglishText = c.EnglishText,
                    NorwegianText = c.NorwegianText
                })
                .ToListAsync(cancellationToken);

            return cards;
        }
    }
}

