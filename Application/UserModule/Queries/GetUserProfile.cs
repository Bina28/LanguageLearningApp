using Application.Dtos;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.UserModule.Queries;

public class GetUserProfile
{
    public class Query : IRequest<UserProfileDto>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, UserProfileDto>
    {
        public async Task<UserProfileDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);
            return  mapper.Map<UserProfileDto>(user);
        }
    }
}
