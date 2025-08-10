using Domain;
using MediatR;
using Persistence;

namespace Application.UserModule.Commands;

public class UpdateUser { 
    
public class Command: IRequest
{
        public required User User { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public  async Task Handle(Command request, CancellationToken cancellationToken)
        {
            context.Users.Update(request.User);
            await context.SaveChangesAsync(cancellationToken);
            
        }
    }
}
