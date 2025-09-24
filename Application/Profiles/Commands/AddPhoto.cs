using System;
using Application.Core;
using Application.Dtos;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{

  public class Command : IRequest<Result<Photo>>
  {
    public required IFormFile File { get; set; }
  }

  public class Handler(AppDbContext context, IPhotoService photoService, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Photo>>
  {
    public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
    {
      var uploadResult = await photoService.UploadPhoto(request.File);
      if (uploadResult == null) return Result<Photo>.Failure("Failed to uplaod photo", 400);
      var user = await userAccessor.GetUserAsync();
      var photo = new Photo
      {
        Url = uploadResult.Url,
        UserId = user.Id,
        PublicId = uploadResult.PublicId
      };

      user.ImageUrl = photo.Url;
      context.Photos.Add(photo);

      var result = await context.SaveChangesAsync(cancellationToken) > 0;

      return result ? Result<Photo>.Success(photo) :
      Result<Photo>.Failure("Problem saving photo to DB", 404);

    }
  }

}
