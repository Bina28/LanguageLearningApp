using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhoto
{
  public class Query : IRequest<Result<Photo>>
  {
    public required string UserId { get; set; }
  }

  public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Photo>>
  {
    public async Task<Result<Photo>> Handle(Query request, CancellationToken cancellationToken)
    {
      var photo = await context.Users
      .Where(x => x.Id == request.UserId)
      .Select(x => x.Photo)
      .FirstOrDefaultAsync(cancellationToken);
      return Result<Photo>.Success(photo);
    }


  }
}
