using Microsoft.EntityFrameworkCore;
using Npgsql;
using PlacementCellBackend.Data;
using PlacementCellBackend.Services.CRUD;
using PlacementCellBackend.Services.CRUD.Interfaces;
using PlacementCellBackend.Services.Placements;
using PlacementCellBackend.Services.Placements.Interfaces;
using PlacementCellBackend.Services.Feedback;
using PlacementCellBackend.Services.Feedback.Interfaces;
using PlacementCellBackend.Services.Analytics;
using PlacementCellBackend.Services.Analytics.Interfaces;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure Npgsql to enable dynamic JSON serialization
var dataSourceBuilder = new NpgsqlDataSourceBuilder(builder.Configuration.GetConnectionString("DefaultConnection"));
dataSourceBuilder.EnableDynamicJson();
var dataSource = dataSourceBuilder.Build();

// Add services to the container.
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IAlumniService, AlumniService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<ICompanyEmployeeService, CompanyEmployeeService>();
builder.Services.AddScoped<IEmployeeOnStudentService, EmployeeOnStudentService>();
builder.Services.AddScoped<IExperienceOpeningService, ExperienceOpeningService>();
builder.Services.AddScoped<IFeedbackOnCompanyService, FeedbackOnCompanyService>();
builder.Services.AddScoped<IFoodReviewService, FoodReviewService>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();
builder.Services.AddScoped<ITeacherPlacementService, TeacherPlacementService>();
builder.Services.AddScoped<IAlumniPlacementService, AlumniPlacementService>();
builder.Services.AddScoped<IPlacementService, PlacementService>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(dataSource));


// Register Analytics Service (Cross-Service Business Logic)
builder.Services.AddScoped<IPlacementAnalyticsService, PlacementAnalyticsService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
