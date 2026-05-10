using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PlacementCellBackend.Controllers.JobsandInterships;
using PlacementCellBackend.DTOs.ReasearchOpeningsDtos;
using PlacementCellBackend.Services.Placements.Interfaces;
using Xunit;

namespace PlacementCellBackend.Tests.Controllers;

/// <summary>
/// Unit tests for ResearchOpeningsController.
/// Uses Moq to mock the service layer.
/// </summary>
public class ResearchOpeningsControllerTests
{
    private readonly Mock<ITeacherPlacementService> _mockService;
    private readonly ResearchOpeningsController _controller;

    public ResearchOpeningsControllerTests()
    {
        _mockService = new Mock<ITeacherPlacementService>();
        _controller = new ResearchOpeningsController(_mockService.Object);
    }

    #region Helper Methods

    private static ResearchOpeningDto CreateSampleDto(string teacherId = "T001", string title = "Test Research")
    {
        return new ResearchOpeningDto
        {
            Id = teacherId,
            teachername = "Dr. Test",
            Title = title,
            Description = "Test Description",
            Department = "Computer Science",
            Researcharea = "AI",
            Stipend = "10000",
            Duration = "6 months",
            PostedDate = DateOnly.FromDateTime(DateTime.Now),
            DeadLine = DateOnly.FromDateTime(DateTime.Now.AddMonths(1)),
            link = "https://example.com",
            IsActive = "true"
        };
    }

    private static ResearchOpeningCreateDto CreateSampleCreateDto(string teacherId = "T001")
    {
        return new ResearchOpeningCreateDto
        {
            Id = teacherId,
            Title = "New Research",
            Description = "New Description",
            Department = "Computer Science",
            Researcharea = "Machine Learning",
            Stipend = "15000",
            Duration = "6 months",
            PostedDate = DateOnly.FromDateTime(DateTime.Now),
            DeadLine = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
            link = "https://example.com/new",
            IsActive = true
        };
    }

    #endregion

    #region GetAllTeacherResearchOpenings Tests

    [Fact]
    public async Task GetAllTeacherResearchOpenings_ReturnsOkResult()
    {
        // Arrange
        var openings = new List<ResearchOpeningDto>
        {
            CreateSampleDto("T001", "Research 1"),
            CreateSampleDto("T002", "Research 2")
        };
        _mockService.Setup(s => s.GetAllTeacherResearchOpeningsAsync())
            .ReturnsAsync(openings);

        // Act
        var result = await _controller.GetAllTeacherResearchOpenings();

        // Assert
        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedOpenings = okResult.Value.Should().BeAssignableTo<IEnumerable<ResearchOpeningDto>>().Subject;
        returnedOpenings.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetAllTeacherResearchOpenings_ReturnsEmptyList_WhenNoOpeningsExist()
    {
        // Arrange
        _mockService.Setup(s => s.GetAllTeacherResearchOpeningsAsync())
            .ReturnsAsync(Enumerable.Empty<ResearchOpeningDto>());

        // Act
        var result = await _controller.GetAllTeacherResearchOpenings();

        // Assert
        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedOpenings = okResult.Value.Should().BeAssignableTo<IEnumerable<ResearchOpeningDto>>().Subject;
        returnedOpenings.Should().BeEmpty();
    }

    [Fact]
    public async Task GetAllTeacherResearchOpenings_CallsServiceOnce()
    {
        // Arrange
        _mockService.Setup(s => s.GetAllTeacherResearchOpeningsAsync())
            .ReturnsAsync(new List<ResearchOpeningDto>());

        // Act
        await _controller.GetAllTeacherResearchOpenings();

        // Assert
        _mockService.Verify(s => s.GetAllTeacherResearchOpeningsAsync(), Times.Once);
    }

    #endregion

    #region GetTeacherResearchOpeningById Tests

    [Fact]
    public async Task GetTeacherResearchOpeningById_ReturnsOkResult_WhenOpeningExists()
    {
        // Arrange
        var opening = CreateSampleDto();
        _mockService.Setup(s => s.GetTeacherResearchOpeningByIdAsync(1))
            .ReturnsAsync(opening);

        // Act
        var result = await _controller.GetTeacherResearchOpeningById(1);

        // Assert
        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedOpening = okResult.Value.Should().BeOfType<ResearchOpeningDto>().Subject;
        returnedOpening.Title.Should().Be("Test Research");
    }

    [Fact]
    public async Task GetTeacherResearchOpeningById_ReturnsNotFound_WhenOpeningDoesNotExist()
    {
        // Arrange
        _mockService.Setup(s => s.GetTeacherResearchOpeningByIdAsync(999))
            .ReturnsAsync((ResearchOpeningDto?)null);

        // Act
        var result = await _controller.GetTeacherResearchOpeningById(999);

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task GetTeacherResearchOpeningById_CallsServiceWithCorrectId()
    {
        // Arrange
        _mockService.Setup(s => s.GetTeacherResearchOpeningByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(CreateSampleDto());

        // Act
        await _controller.GetTeacherResearchOpeningById(42);

        // Assert
        _mockService.Verify(s => s.GetTeacherResearchOpeningByIdAsync(42), Times.Once);
    }

    #endregion

    #region CreateTeacherResearchOpening Tests

    [Fact]
    public async Task CreateTeacherResearchOpening_ReturnsCreatedAtActionResult()
    {
        // Arrange
        var createDto = CreateSampleCreateDto();
        var resultDto = CreateSampleDto();
        _mockService.Setup(s => s.CreateTeacherResearchOpeningAsync(It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(resultDto);

        // Act
        var result = await _controller.CreateTeacherResearchOpening(createDto);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
    }

    [Fact]
    public async Task CreateTeacherResearchOpening_ReturnsCreatedOpening()
    {
        // Arrange
        var createDto = CreateSampleCreateDto();
        var resultDto = CreateSampleDto();
        resultDto.Title = "Created Research";
        
        _mockService.Setup(s => s.CreateTeacherResearchOpeningAsync(It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(resultDto);

        // Act
        var result = await _controller.CreateTeacherResearchOpening(createDto);

        // Assert
        var createdResult = result.Result.Should().BeOfType<CreatedAtActionResult>().Subject;
        var returnedOpening = createdResult.Value.Should().BeOfType<ResearchOpeningDto>().Subject;
        returnedOpening.Title.Should().Be("Created Research");
    }

    [Fact]
    public async Task CreateTeacherResearchOpening_CallsServiceWithProvidedDto()
    {
        // Arrange
        var createDto = CreateSampleCreateDto();
        createDto.Title = "Unique Title For Verification";
        
        _mockService.Setup(s => s.CreateTeacherResearchOpeningAsync(It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(CreateSampleDto());

        // Act
        await _controller.CreateTeacherResearchOpening(createDto);

        // Assert
        _mockService.Verify(s => s.CreateTeacherResearchOpeningAsync(
            It.Is<ResearchOpeningCreateDto>(dto => dto.Title == "Unique Title For Verification")), 
            Times.Once);
    }

    #endregion

    #region UpDateTeacherResearchOpening Tests

    [Fact]
    public async Task UpDateTeacherResearchOpening_ReturnsNoContent_WhenUpdateSuccessful()
    {
        // Arrange
        var updateDto = CreateSampleCreateDto();
        _mockService.Setup(s => s.UpDateTeacherResearchOpeningAsync(1, It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(true);

        // Act
        var result = await _controller.UpDateTeacherResearchOpening(1, updateDto);

        // Assert
        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task UpDateTeacherResearchOpening_ReturnsNotFound_WhenOpeningDoesNotExist()
    {
        // Arrange
        var updateDto = CreateSampleCreateDto();
        _mockService.Setup(s => s.UpDateTeacherResearchOpeningAsync(999, It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.UpDateTeacherResearchOpening(999, updateDto);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task UpDateTeacherResearchOpening_CallsServiceWithCorrectParameters()
    {
        // Arrange
        var updateDto = CreateSampleCreateDto();
        updateDto.Title = "Updated Title";
        
        _mockService.Setup(s => s.UpDateTeacherResearchOpeningAsync(It.IsAny<int>(), It.IsAny<ResearchOpeningCreateDto>()))
            .ReturnsAsync(true);

        // Act
        await _controller.UpDateTeacherResearchOpening(42, updateDto);

        // Assert
        _mockService.Verify(s => s.UpDateTeacherResearchOpeningAsync(
            42, 
            It.Is<ResearchOpeningCreateDto>(dto => dto.Title == "Updated Title")), 
            Times.Once);
    }

    #endregion

    #region DeleteTeacherResearchOpening Tests

    [Fact]
    public async Task DeleteTeacherResearchOpening_ReturnsNoContent_WhenDeleteSuccessful()
    {
        // Arrange
        _mockService.Setup(s => s.DeleteTeacherResearchOpeningAsync(1))
            .ReturnsAsync(true);

        // Act
        var result = await _controller.DeleteTeacherResearchOpening(1);

        // Assert
        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task DeleteTeacherResearchOpening_ReturnsNotFound_WhenOpeningDoesNotExist()
    {
        // Arrange
        _mockService.Setup(s => s.DeleteTeacherResearchOpeningAsync(999))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.DeleteTeacherResearchOpening(999);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task DeleteTeacherResearchOpening_CallsServiceWithCorrectId()
    {
        // Arrange
        _mockService.Setup(s => s.DeleteTeacherResearchOpeningAsync(It.IsAny<int>()))
            .ReturnsAsync(true);

        // Act
        await _controller.DeleteTeacherResearchOpening(42);

        // Assert
        _mockService.Verify(s => s.DeleteTeacherResearchOpeningAsync(42), Times.Once);
    }

    #endregion
}
