using Application.Dtos;
using Application.LearningModule.Commands;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RegisterDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => BCrypt.Net.BCrypt.HashPassword(src.Password)))
            .ForMember(dest => dest.LastLoginDate, opt => opt.MapFrom(_ => DateTime.Now))
            .ForMember(dest => dest.CompletedUnits, opt => opt.MapFrom(_ => 0));

        CreateMap<AddOrUpdateUserCourse, UserCourse>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
           .ForMember(dest => dest.LastCompletedDay, opt => opt.MapFrom(src => src.IsCompleted ? DateTime.UtcNow : (DateTime?)null))
           .ForMember(dest => dest.Attempts, opt => opt.Ignore());

        CreateMap<CourseCard, CardsDto>();

        CreateMap<UserCourse, UserCourseDto>()
    .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
    .ForMember(dest => dest.CourseDescription, opt => opt.MapFrom(src => src.Course.Description));

        CreateMap<User, UserProfileDto>();
      
    }


}
