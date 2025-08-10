using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<CardsDto>>
    {
        public async Task<List<CardsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var cards = await context.CourseCards
                .Where(c => c.CourseId == request.Id)
                .ProjectTo<CardsDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return cards;
        }
    }
}

