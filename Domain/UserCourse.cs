using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;


public class UserCourse
{
    public required string UserId { get; set; }
    public User? User { get; set; }
    public int CourseId { get; set; }
    public Course? Course { get; set; }

    public DateTime? LastCompletedDay { get; set; }
    public int Attempts { get; set; }
    public bool IsCompleted { get; set; }



}
