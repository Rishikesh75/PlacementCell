using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Data;

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

    public DbSet<EmployeeonStudent> employeeonstudent { get; set; }

    public DbSet<Companyemployee> companyemployee { get; set; }

    public DbSet<Company> company { get; set; }

    public DbSet<Alumni> alumni { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure CodingRound as owned entity
        modelBuilder.Entity<FeedBackOnCompany>()
            .OwnsOne(f => f.CodingRoundInfo, cr =>
            {
                cr.Property(c => c.Questions)
                    .HasColumnName("CodingRoundInfo_Questions")
                    .HasColumnType("jsonb");
            });

        // Configure TechnicalRound as owned entity
        modelBuilder.Entity<FeedBackOnCompany>()
            .OwnsOne(f => f.TechnicalRoundInfo, tr =>
            {
                tr.Property(t => t.DSAQuestions)
                    .HasColumnName("TechnicalRoundInfo_DSAQuestions")
                    .HasColumnType("jsonb");

                tr.Property(t => t.DBMSQuestions)
                    .HasColumnName("TechnicalRoundInfo_DBMSQuestions")
                    .HasColumnType("jsonb");

                tr.Property(t => t.SystemDesignQuestions)
                    .HasColumnName("TechnicalRoundInfo_SystemDesignQuestions")
                    .HasColumnType("jsonb");

                tr.Property(t => t.PuzzleBasedQuestions)
                    .HasColumnName("TechnicalRoundInfo_PuzzleBasedQuestions")
                    .HasColumnType("jsonb");
            });

        // Configure HRRound as owned entity
        modelBuilder.Entity<FeedBackOnCompany>()
            .OwnsOne(f => f.HRRoundInfo, hr =>
            {
                hr.Property(h => h.SituationBasedQuestions)
                    .HasColumnName("HRRoundInfo_SituationBasedQuestions")
                    .HasColumnType("jsonb");

                hr.Property(h => h.UnExpectedQuestions)
                    .HasColumnName("HRRoundInfo_UnExpectedQuestions")
                    .HasColumnType("jsonb");
            });

        // Configure Resources as owned entity
        modelBuilder.Entity<FeedBackOnCompany>()
            .OwnsOne(f => f.ResourcesInfo, r =>
            {
                r.Property(res => res.ResourcesList)
                    .HasColumnName("ResourcesInfo_ResourcesList")
                    .HasColumnType("jsonb");
            });
    }
}
