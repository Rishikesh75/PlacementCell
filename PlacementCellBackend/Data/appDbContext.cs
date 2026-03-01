using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // College - top-level tenant entity
    public DbSet<College> college { get; set; }

    public DbSet<Student> student { get; set; }
    public DbSet<Teacher> teacher { get; set; }

    public DbSet<ResearchOpening> teacherresearchopening { get; set; }

    public DbSet<Restaurents> restaurents { get; set; }

    public DbSet<FoodReview> foodReview { get; set; }

    public DbSet<AlumniFeedBackonCompany> alumnifeedbackoncompany { get; set; }

    public DbSet<EmployeeFeedbackonStudent> employeefeedbackonstudent { get; set; }

    public DbSet<Companyemployee> companyemployee { get; set; }

    public DbSet<Company> company { get; set; }

    public DbSet<Alumni> alumni { get; set; }

    public DbSet<AlumniJobOpenings> alumnijobposition { get; set; }

    public DbSet<Placement> placement { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // College unique constraint on CollegeCode
        modelBuilder.Entity<College>()
            .HasIndex(c => c.CollegeCode)
            .IsUnique();

        // College relationships for college-specific entities
        modelBuilder.Entity<Student>()
            .HasOne(s => s.College)
            .WithMany(c => c.Students)
            .HasForeignKey(s => s.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Teacher>()
            .HasOne(t => t.College)
            .WithMany(c => c.Teachers)
            .HasForeignKey(t => t.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Alumni>()
            .HasOne(a => a.College)
            .WithMany(c => c.Alumni)
            .HasForeignKey(a => a.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Placement>()
            .HasOne(p => p.College)
            .WithMany(c => c.Placements)
            .HasForeignKey(p => p.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AlumniJobOpenings>()
            .HasOne(j => j.College)
            .WithMany(c => c.JobOpenings)
            .HasForeignKey(j => j.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Feedback entities - college-specific
        modelBuilder.Entity<AlumniFeedBackonCompany>()
            .HasOne(f => f.College)
            .WithMany(c => c.AlumniFeedbacks)
            .HasForeignKey(f => f.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EmployeeFeedbackonStudent>()
            .HasOne(f => f.College)
            .WithMany(c => c.EmployeeFeedbacks)
            .HasForeignKey(f => f.CollegeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure CodingRound as owned entity
        modelBuilder.Entity<AlumniFeedBackonCompany>()
            .OwnsOne(f => f.CodingRoundInfo, cr =>
            {
                cr.Property(c => c.Questions)
                    .HasColumnName("CodingRoundInfo_Questions")
                    .HasColumnType("jsonb");
            });

        // Configure TechnicalRound as owned entity
        modelBuilder.Entity<AlumniFeedBackonCompany>()
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
        modelBuilder.Entity<AlumniFeedBackonCompany>()
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
        modelBuilder.Entity<AlumniFeedBackonCompany>()
            .OwnsOne(f => f.ResourcesInfo, r =>
            {
                r.Property(res => res.Links)
                    .HasColumnName("ResourcesInfo_Links")
                    .HasColumnType("jsonb");

                r.Property(res => res.Books)
                    .HasColumnName("ResourcesInfo_Books")
                    .HasColumnType("jsonb");
            });
    }
}
