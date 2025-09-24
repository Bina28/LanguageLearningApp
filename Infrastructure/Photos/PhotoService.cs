using System;
using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
  private readonly Cloudinary _cloudinary;

  public PhotoService(IOptions<CloudinarySettings> config)
  {
    var account = new Account
    (
      config.Value.CloudName,
      config.Value.ApiKey,
      config.Value.ApiSecret
    );

    _cloudinary = new Cloudinary(account);
  }

  public async Task<string> DeletePhoto(string publicId)
  {
    var deleteParams = new DeletionParams(publicId);
    var result = await _cloudinary.DestroyAsync(deleteParams);

    if (result.Error != null)
    {
      throw new Exception(result.Error.Message);
    }

    return result.Result;
  }

  public async Task<PhotoUploadResult?> UploadPhoto(IFormFile formFile)
  {
    if (formFile.Length > 0)
    {
      await using var stream = formFile.OpenReadStream();

      var uploadParams = new ImageUploadParams
      {
        File = new FileDescription(formFile.Name, stream),
        Folder = "Lexi2025"
      };

      var uplaodResult = await _cloudinary.UploadAsync(uploadParams);
      if (uplaodResult.Error != null)
      {
        throw new Exception(uplaodResult.Error.Message);
      }
      return new PhotoUploadResult
      {
        PublicId = uplaodResult.PublicId,
        Url = uplaodResult.SecureUrl.AbsoluteUri
      };
    }
    return null;
  }
  
}
