using Application.Dtos;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserModule.Commands;

public class UpdateUser { 
    
public class Command: IRequest
{
        public required UserUpdateDto User { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FindAsync([request.User.Id], cancellationToken) ?? throw new Exception("User not found");
      user.FullName = request.User.FullName;
            user.Email = request.User.Email;
           

            context.Users.Update(user);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
