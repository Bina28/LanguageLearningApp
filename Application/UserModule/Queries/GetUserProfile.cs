using Application.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserModule.Queries;

public class GetUserProfile
{
    public class Query : IRequest<UserProfileDto>
    {
        public required int UserId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, UserProfileDto>
    {
        public async Task<UserProfileDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);

            if (user == null)
                return null;

            return new UserProfileDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };

        }
    }
}
