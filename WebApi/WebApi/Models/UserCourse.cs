﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models;

public class UserCourse
{
	public int Id { get; set; } 
	public int CourseId { get; set; } 
	public DateTime? LastCompletedDay { get; set; } 
	public int Attempts { get; set; }  
	public bool IsCompleted { get; set; }

	[ForeignKey("Id")]
	public User User { get; set; }

	[ForeignKey("CourseId")]
	public Course Course { get; set; }
}
