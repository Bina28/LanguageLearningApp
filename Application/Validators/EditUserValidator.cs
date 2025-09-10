using System;
using Application.UserModule.Commands;
using FluentValidation;

namespace Application.Validators;

public class EditUserValidator : AbstractValidator<UpdateUser.Command>
{
  public EditUserValidator()
  {
    RuleFor(x => x.UserDto.DisplayName).NotEmpty().MaximumLength(100).WithMessage("Name is required");
    RuleFor(x => x.UserDto.Email).NotEmpty().WithMessage("Email is required");

  }
}
