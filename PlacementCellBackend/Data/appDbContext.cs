using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> student { get; set; }
        public DbSet<Teacher> teacher { get; set; }

        public DbSet<TeacherPlacements> teacherplacements { get; set; }

        public DbSet<Restaurents> restaurents { get; set; }

        public DbSet<Food> food { get; set; }

        public DbSet<FeedBackOnCompany> feedbackoncompany { get; set; }

        public DbSet<ExperienceOpening> experienceopening { get; set; }

        public DbSet<EmployeeonStudent> employeeonstudent{ get; set; }

        public DbSet<Companyemployee> companyemployee { get; set; }

        public DbSet<Company> company { get; set; }

        public DbSet<Alumni> alumni { get; set; }


    }
}
