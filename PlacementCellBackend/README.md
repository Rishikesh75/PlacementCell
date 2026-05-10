# PlacementCell Backend

A .NET 8 backend application for the Placement Cell management system.

## Prerequisites

- .NET 8 SDK
- PostgreSQL database (Supabase)
- Google Cloud Console account (for Calendar API)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PlacementCellBackend
```

### 2. Configure User Secrets

This project uses .NET User Secrets to store sensitive credentials securely. User Secrets are stored locally on your machine and are NOT committed to source control.

#### Google Calendar API Credentials

Run the following commands to set up the required secrets:

```powershell
cd PlacementCellBackend

# Initialize user secrets (if not already done)
dotnet user-secrets init

# Set Google Calendar credentials (get these from your team lead)
dotnet user-secrets set "GoogleCalendar:ClientId" "<your-client-id>"
dotnet user-secrets set "GoogleCalendar:ClientSecret" "<your-client-secret>"
dotnet user-secrets set "GoogleCalendar:ProjectId" "<your-project-id>"
dotnet user-secrets set "GoogleCalendar:ApplicationName" "PlacementCell MentorMentee"
```

> **Note:** Contact your team lead or project administrator to get the actual credential values.

#### Verify Your Secrets

To list all configured secrets:

```powershell
dotnet user-secrets list
```

### 3. Run the Application

```bash
dotnet restore
dotnet run
```

The API will be available at `https://localhost:5001` or `http://localhost:5000`.

## Project Structure

```
PlacementCellBackend/
├── Controllers/          # API Controllers
├── Data/                 # Database Context
├── DTOs/                 # Data Transfer Objects
├── Helpers/              # Utility classes
├── Migrations/           # EF Core Migrations
├── Models/               # Entity Models
├── Services/             # Business Logic Services
│   ├── Analytics/
│   ├── CRUD/
│   ├── Feedback/
│   ├── MentorMenteeService/
│   └── Placements/
└── Sql/                  # Raw SQL Queries
```

## Features

- Student, Teacher, Alumni, and Company management
- Placement drives and job openings
- Research openings management
- Mentor-Mentee meetings with Google Calendar integration
- Placement analytics and reporting
- Food review system for campus restaurants

## Environment-Specific Configuration

- **Development**: Uses .NET User Secrets
- **Production**: Use environment variables or Azure Key Vault

### Production Environment Variables

For production deployment, set these environment variables:

```bash
GoogleCalendar__ClientId=<your-client-id>
GoogleCalendar__ClientSecret=<your-client-secret>
GoogleCalendar__ProjectId=<your-project-id>
GoogleCalendar__ApplicationName=PlacementCell MentorMentee
```

## License

Internal use only - IIITDM Kancheepuram
