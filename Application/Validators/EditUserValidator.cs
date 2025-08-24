using System;
using Application.UserModule.Commands;
using FluentValidation;

namespace Application.Validators;

public class EditUserValidator : AbstractValidator<UpdateUser.Command>
{
  public EditUserValidator()
  {
    RuleFor(x => x.User.FullName).NotEmpty().MaximumLength(100).WithMessage("FullName is required");
    RuleFor(x => x.User.Email).NotEmpty().WithMessage("Email is required");

  }
}
