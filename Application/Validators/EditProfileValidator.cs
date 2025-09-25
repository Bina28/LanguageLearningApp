using System;
using Application.Profiles.Commands;
using FluentValidation;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace Application.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
  public EditProfileValidator()
  {
    RuleFor(x => x.DisplayName).NotEmpty();
  }
}
