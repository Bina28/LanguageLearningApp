using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserModule.Queries;

public class GetUsers
{
    public class Query : IRequest<List<User>> { }
    

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<User>>
    {
        public async Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Users.ToListAsync(cancellationToken);
        }
    }
}
