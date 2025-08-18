using System;
using Domain;

namespace Application.Dtos;

public class PaginatedCoursesDto
{
  public List<Course> Items { get; set; } = [];
    public int TotalPages { get; set; }
}
