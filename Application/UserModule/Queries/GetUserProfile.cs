using Application.Core;
using Application.Dtos;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.UserModule.Queries;

public class GetUserProfile
{
    public class Query : IRequest<Result<UserProfileDto>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<UserProfileDto>>
    {
        public async Task<Result<UserProfileDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);
            if (user == null) return Result<UserProfileDto>.Failure("User not found", 404);


            var dto = mapper.Map<UserProfileDto>(user);
            return Result<UserProfileDto>.Success(dto);
        }
    }
}
