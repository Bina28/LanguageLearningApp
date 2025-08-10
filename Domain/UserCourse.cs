using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;


public class UserCourse
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public int CourseId { get; set; }
    public DateTime? LastCompletedDay { get; set; }
    public int Attempts { get; set; }
    public bool IsCompleted { get; set; }

    [ForeignKey("Id")]
    public required User User { get; set; }

    [ForeignKey("CourseId")]
    public required Course Course { get; set; }
}
