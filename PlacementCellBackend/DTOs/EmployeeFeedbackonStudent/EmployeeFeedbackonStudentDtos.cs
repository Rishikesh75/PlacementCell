namespace PlacementCellBackend.DTOs.EmployeeFeedbackonStudent;

public class EmployeeFeedbackonStudentDtos
{
    public int? feedbackId { get; set; }

    public string employeeName { get; set; } = string.Empty;

    public string compnayName { get; set; } = string.Empty;

    public string batchId { get; set; } = string.Empty;

    public string description { get; set; } = string.Empty;
}


public class EmployeeFeedbackonStudentCreateDtos
{
    public string CompanyEmpId { get; set; } = string.Empty;
    public string batchId { get; set; } = string.Empty;
    public string description { get; set; } = string.Empty;
}