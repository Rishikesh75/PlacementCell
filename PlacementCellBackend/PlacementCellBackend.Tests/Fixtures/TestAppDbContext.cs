using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Models;
using PlacementCellBackend.Models.InterviewRounds;

namespace PlacementCellBackend.Tests.Fixtures;

/// <summary>
/// A simplified DbContext for testing that only includes entities needed for tests.
/// This avoids issues with complex JSONB configurations that don't work with InMemory provider.
/// </summary>
public class TestAppDbContext : DbContext
{
    public TestAppDbContext(DbContextOptions<TestAppDbContext> options)
        : base(options)
    {
    }

    // Core entities for testing
    public DbSet<College> college { get; set; }
    public DbSet<Student> student { get; set; }
    public DbSet<Teacher> teacher { get; set; }
    public DbSet<ResearchOpening> teacherresearchopening { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Explicitly ignore all types that cause InMemory provider issues
        modelBuilder.Ignore<Resources>();
        modelBuilder.Ignore<BookResource>();
        modelBuilder.Ignore<LinkResource>();

        // Configure College entity - ignore problematic navigation properties
        modelBuilder.Entity<College>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Ignore(c => c.Alumni);
            entity.Ignore(c => c.Placements);
            entity.Ignore(c => c.JobOpenings);
            entity.Ignore(c => c.AlumniFeedbacks);
            entity.Ignore(c => c.EmployeeFeedbacks);
            entity.Ignore(c => c.PlacementOfficer);
        });

        // Configure Student - ignore navigation properties not needed for tests
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Ignore(s => s.College);
        });

        // Configure Teacher - ignore College navigation to avoid cascading entity discovery
        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Ignore(t => t.College);
        });

        // Configure ResearchOpening - ignore Teacher navigation property
        modelBuilder.Entity<ResearchOpening>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.Ignore(r => r.Teacher);
        });
    }
}
