﻿using System.ComponentModel.DataAnnotations;
namespace PlacementCellBackend.Models
{
    public class Teacher
    {
        [Key]
        public string teacher_id { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string department { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
    }
}
