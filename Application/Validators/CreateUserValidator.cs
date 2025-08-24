using System;
using Application.UserModule.Commands;
using FluentValidation;

namespace Application.Validators;

public class CreateUserValidator: AbstractValidator<CreateUser.Command>
{
  public CreateUserValidator()
  {
    RuleFor(x => x.CreateUserDto.FullName).NotEmpty().MaximumLength(100).WithMessage("FullName is required");
    RuleFor(x => x.CreateUserDto.Email).NotEmpty().WithMessage("Email is required");
    RuleFor(x => x.CreateUserDto.Password).NotEmpty().WithMessage("Password is required");
}
}
