using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;


public class UserCourse
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public DateTime? LastCompletedDay { get; set; }
    public int Attempts { get; set; }
    public bool IsCompleted { get; set; }


    public string UserId { get; set; } = default!;
    public User? User { get; set; } 
    public int CourseId { get; set; }
    public Course? Course { get; set; }
}
