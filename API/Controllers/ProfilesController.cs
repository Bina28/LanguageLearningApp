using System;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
  [HttpPost("add-photo")]
  public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
  {
    return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
  }

  [HttpGet("{userId}/photos")]
  public async Task<ActionResult<Photo>> GetPhotoForUser(string userId)
  {
    return HandleResult(await Mediator.Send(new GetProfilePhoto.Query { UserId = userId }));
  }

  [HttpDelete("{photoId}/photo")]
  public async Task<ActionResult> DeletePhoto(string photoId)
  {
    return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
  }

  [HttpGet("{userId}")]
  public async Task<ActionResult<UserProfile>> GetProfile(string userId)
  {
    return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
  }

  [HttpPut]
  public async Task<ActionResult> UpdateProfile(EditProfile.Command command)
  {
    return HandleResult(await Mediator.Send(command));
  }
}
