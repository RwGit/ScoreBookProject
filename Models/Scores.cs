using System;
using System.Collections.Generic;

namespace ScoreBookProject.Models
{
    public partial class Scores
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int Score { get; set; }

        public virtual Student Student { get; set; }
    }
}
