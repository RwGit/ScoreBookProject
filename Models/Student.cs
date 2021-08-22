using System;
using System.Collections.Generic;

namespace ScoreBookProject.Models
{
    public partial class Student
    {
        public Student()
        {
            Scores = new HashSet<Scores>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Scores> Scores { get; set; }
    }
}
