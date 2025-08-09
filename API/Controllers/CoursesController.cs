using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using WebApi.Models;

namespace API.Controllers;

public class CoursesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        return await context.Courses.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourseDetail(int id)
    {
        var course = await context.Courses.FindAsync(id);
        if (course == null) return NotFound();
        return course;


    }
}
