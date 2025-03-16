using Microsoft.EntityFrameworkCore;
using System.Numerics;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Services;

public class LearningService : ILearningService
{
	private readonly AppDbContext _context;

	public LearningService(AppDbContext context)
	{
		_context = context;
	}



	public async Task<List<CardsDto>> GetCards(int id)
	{
		return await _context.CourseCards
		.Where(c => c.CourseId == id)
		.Select(c => new CardsDto
		{
			Id = c.Id,
			CourseId = c.CourseId,
			EnglishText = c.EnglishText,
			NorwegianText = c.NorwegianText
		})
		.ToListAsync();
	}

	public async Task<bool> CompleteUnit(int userId, int correctAnswers)
	{
		var user = await _context.Users.FindAsync(userId);
		if (user == null) return false;

		if (correctAnswers < 3)
		{
			return false; // User did not pass, cannot go to next unit
		}

		// Increase the completed units count
		user.CompletedUnits++;
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<int> GetCompletedUnits(int userId)
	{
		var user = await _context.Users.FindAsync(userId);
		return user?.CompletedUnits ?? 0;
	}

	public async Task<PaginatedCourseList<Course>> GetCourses(int pageIndex, int pageSize)
	{
		var courses = await _context.Courses
			.OrderBy(b => b.CourseId)
			.Skip((pageIndex - 1) * pageSize)
			.Take(pageSize)
			.ToListAsync();

		var count = await _context.Courses.CountAsync();
		var totalPages = (int)Math.Ceiling(count / (double)pageSize);

		return new PaginatedCourseList<Course>(courses, pageIndex, totalPages);
	}

}
