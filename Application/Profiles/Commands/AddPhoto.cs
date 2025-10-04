using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class AddOrUpdatePhoto
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
      if (uploadResult == null)
        return Result<Photo>.Failure("Failed to upload photo", 400);

      var user = await context.Users
       .Include(u => u.Photo)
       .FirstOrDefaultAsync(u => u.Id == userAccessor.GetUserID(), cancellationToken);

      if (user == null)
        return Result<Photo>.Failure("User not found", 404);

      if (user.Photo != null)
      {

        await photoService.DeletePhoto(user.Photo.PublicId);

        user.Photo.Url = uploadResult.Url;
        user.Photo.PublicId = uploadResult.PublicId;
      }
      else
      {

        var photo = new Photo
        {
          Url = uploadResult.Url,
          PublicId = uploadResult.PublicId,
          UserId = user.Id
        };
        user.Photo = photo;
        context.Photos.Add(photo);
      }


      user.ImageUrl = uploadResult.Url;
      var result = await context.SaveChangesAsync(cancellationToken) > 0;

      return result ? Result<Photo>.Success(user.Photo) :
      Result<Photo>.Failure("Problem saving photo to DB", 404);

    }
  }
}




