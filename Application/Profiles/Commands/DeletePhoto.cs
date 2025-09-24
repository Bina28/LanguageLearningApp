using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
  public class Command : IRequest<Result<Unit>>
  {
    public required string PhotoId { get; set; }
  }

  public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
  {
    public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
    {
      var user = await userAccessor.GetUserWithPhotosAsync();
      var photo = user.Photo;
      if (photo == null) return Result<Unit>.Failure("Can not find photo", 400);
      await photoService.DeletePhoto(photo.PublicId);
      context.Photos.Remove(photo);
      user.ImageUrl = null;
      var result = await context.SaveChangesAsync(cancellationToken) > 0;

      return result ?
      Result<Unit>.Success(Unit.Value)
      : Result<Unit>.Failure("Problem delelting photo", 400);

    }
  }
}
