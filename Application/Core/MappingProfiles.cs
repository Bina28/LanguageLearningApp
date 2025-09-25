using Application.Dtos;
using Application.LearningModule.Commands;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CourseCard, CardsDto>();
        CreateMap<UserCourse, UserCourseDto>()
    .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
    .ForMember(dest => dest.CourseDescription, opt => opt.MapFrom(src => src.Course.Description));

        CreateMap<User, UserProfile>();
    }


}
