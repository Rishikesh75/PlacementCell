using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Tests.Fixtures;

/// <summary>
/// Provides an in-memory database context for unit testing.
/// Uses TestAppDbContext which avoids complex JSONB configurations.
/// Each test gets a fresh database instance.
/// </summary>
public class TestDatabaseFixture : IDisposable
{
    public TestAppDbContext Context { get; private set; }

    public TestDatabaseFixture()
    {
        var options = new DbContextOptionsBuilder<TestAppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        Context = new TestAppDbContext(options);
        Context.Database.EnsureCreated();
    }

    /// <summary>
    /// Creates a new in-memory context with a unique database name.
    /// Use this when you need isolated test scenarios.
    /// </summary>
    public static TestAppDbContext CreateFreshContext()
    {
        var options = new DbContextOptionsBuilder<TestAppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new TestAppDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    /// <summary>
    /// Seeds the database with sample test data for research openings tests.
    /// </summary>
    public async Task SeedResearchOpeningsDataAsync()
    {
        // Add a college first (required for Teacher)
        var college = new College
        {
            Id = 1,
            CollegeName = "Test University",
            Address = "123 Test Street",
            City = "Test City",
            State = "Test State",
            AdminID = "admin1"
        };
        Context.college.Add(college);

        // Add teachers
        var teachers = new List<Teacher>
        {
            new Teacher
            {
                Id = "T001",
                Name = "Dr. John Smith",
                Email = "john.smith@test.edu",
                Department = "Computer Science",
                CollegeId = 1
            },
            new Teacher
            {
                Id = "T002",
                Name = "Dr. Jane Doe",
                Email = "jane.doe@test.edu",
                Department = "Electronics",
                CollegeId = 1
            }
        };
        Context.teacher.AddRange(teachers);

        // Add research openings with explicit IDs for InMemory testing
        var researchOpenings = new List<ResearchOpening>
        {
            new ResearchOpening
            {
                Id = "1",
                TeacherId = "T001",
                Title = "Machine Learning Research",
                Description = "Research on neural networks and deep learning",
                Department = "Computer Science",
                Researcharea = "Artificial Intelligence",
                Stipend = "15000",
                Duration = "6 months",
                PostedDate = DateOnly.FromDateTime(DateTime.Now),
                DeadLine = DateOnly.FromDateTime(DateTime.Now.AddMonths(1)),
                Link = "https://example.com/ml-research",
                IsActive = true
            },
            new ResearchOpening
            {
                Id = "2",
                TeacherId = "T002",
                Title = "IoT Systems Development",
                Description = "Building smart IoT devices",
                Department = "Electronics",
                Researcharea = "Internet of Things",
                Stipend = "12000",
                Duration = "4 months",
                PostedDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-10)),
                DeadLine = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                Link = "https://example.com/iot-research",
                IsActive = true
            },
            new ResearchOpening
            {
                Id = "3",
                TeacherId = "T001",
                Title = "Cybersecurity Analysis",
                Description = "Research on network security threats",
                Department = "Computer Science",
                Researcharea = "Cybersecurity",
                Stipend = "18000",
                Duration = "8 months",
                PostedDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)),
                DeadLine = DateOnly.FromDateTime(DateTime.Now.AddMonths(3)),
                Link = "https://example.com/security-research",
                IsActive = false
            }
        };
        Context.teacherresearchopening.AddRange(researchOpenings);

        await Context.SaveChangesAsync();
    }

    public void Dispose()
    {
        Context.Database.EnsureDeleted();
        Context.Dispose();
    }
}
