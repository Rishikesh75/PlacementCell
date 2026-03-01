using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PlacementCellBackend.Models.InterviewRounds;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ===== Independent Tables (No Foreign Keys) =====
            
            migrationBuilder.CreateTable(
                name: "company",
                columns: table => new
                {
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: false),
                    Industry = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company", x => x.CompanyId);
                });

            migrationBuilder.CreateTable(
                name: "restaurents",
                columns: table => new
                {
                    RestaurentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    contact = table.Column<string>(type: "text", nullable: false),
                    address = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurents", x => x.RestaurentId);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    major = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    GraduationYear = table.Column<long>(type: "bigint", nullable: false),
                    PhoneNo = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "teacher",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacher", x => x.Id);
                });

            // ===== Tables with Foreign Key to Company =====

            migrationBuilder.CreateTable(
                name: "alumni",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    position = table.Column<string>(type: "text", nullable: false),
                    linkdinprofile = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumni", x => x.Id);
                    table.ForeignKey(
                        name: "FK_alumni_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "companyemployee",
                columns: table => new
                {
                    EmployeeId = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    Designation = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companyemployee", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_companyemployee_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "experienceopening",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    jobid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    experiencerequired = table.Column<string>(type: "text", nullable: false),
                    companyempEmail = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_experienceopening", x => x.id);
                    table.ForeignKey(
                        name: "FK_experienceopening_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            // ===== Tables with Multiple Foreign Keys =====

            migrationBuilder.CreateTable(
                name: "foodReview",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RestaurentId = table.Column<int>(type: "integer", nullable: false),
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateOnly>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_foodReview", x => x.id);
                    table.ForeignKey(
                        name: "FK_foodReview_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_foodReview_restaurents_RestaurentId",
                        column: x => x.RestaurentId,
                        principalTable: "restaurents",
                        principalColumn: "RestaurentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teacherresearchopening",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Id = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    researcharea = table.Column<string>(type: "text", nullable: false),
                    stipend = table.Column<string>(type: "text", nullable: false),
                    duration = table.Column<string>(type: "text", nullable: false),
                    postedDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    deadline = table.Column<DateOnly>(type: "Date", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacherresearchopening", x => x.id);
                    table.ForeignKey(
                        name: "FK_teacherresearchopening_teacher_Id",
                        column: x => x.Id,
                        principalTable: "teacher",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "placement",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Id = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    placementDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_placement", x => x.id);
                    table.ForeignKey(
                        name: "FK_placement_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_placement_student_Id",
                        column: x => x.Id,
                        principalTable: "student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // ===== Tables Dependent on Alumni =====

            migrationBuilder.CreateTable(
                name: "alumnifeedbackoncompany",
                columns: table => new
                {
                    feedbackid = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    Id = table.Column<string>(type: "text", nullable: false),
                    CTC = table.Column<string>(type: "text", nullable: false),
                    JobLocation = table.Column<string>(type: "text", nullable: false),
                    JobProfile = table.Column<string>(type: "text", nullable: false),
                    JobType = table.Column<int>(type: "integer", nullable: false),
                    WorkMode = table.Column<int>(type: "integer", nullable: false),
                    // Coding Round Info
                    CodingRoundInfo_CodingPlatform = table.Column<string>(type: "text", nullable: true),
                    CodingRoundInfo_DifficultyLevel = table.Column<int>(type: "integer", nullable: true),
                    CodingRoundInfo_Duration = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    CodingRoundInfo_InterviewMode = table.Column<int>(type: "integer", nullable: true),
                    CodingRoundInfo_Questions = table.Column<List<string>>(type: "jsonb", nullable: true),
                    // HR Round Info
                    HRRoundInfo_InterviewDuration = table.Column<string>(type: "text", nullable: true),
                    HRRoundInfo_InterviewMode = table.Column<int>(type: "integer", nullable: true),
                    HRRoundInfo_SituationBasedQuestions = table.Column<List<SituationBasedQuestion>>(type: "jsonb", nullable: true),
                    HRRoundInfo_UnExpectedQuestions = table.Column<List<UnExpectedQuestion>>(type: "jsonb", nullable: true),
                    // Technical Round Info
                    TechnicalRoundInfo_InterviewDuration = table.Column<string>(type: "text", nullable: true),
                    TechnicalRoundInfo_InterviewMode = table.Column<int>(type: "integer", nullable: true),
                    TechnicalRoundInfo_DSAQuestions = table.Column<List<DSAQuestion>>(type: "jsonb", nullable: true),
                    TechnicalRoundInfo_DBMSQuestions = table.Column<List<DBMSQuestion>>(type: "jsonb", nullable: true),
                    TechnicalRoundInfo_SystemDesignQuestions = table.Column<List<ValueTuple<string, ValueTuple<string, string>>>>(type: "jsonb", nullable: true),
                    TechnicalRoundInfo_PuzzleBasedQuestions = table.Column<List<ValueTuple<string, ValueTuple<string, string>>>>(type: "jsonb", nullable: true),
                    // Resources Info
                    ResourcesInfo_Links = table.Column<List<LinkResource>>(type: "jsonb", nullable: true),
                    ResourcesInfo_Books = table.Column<List<BookResource>>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumnifeedbackoncompany", x => x.feedbackid);
                    table.ForeignKey(
                        name: "FK_alumnifeedbackoncompany_alumni_Id",
                        column: x => x.Id,
                        principalTable: "alumni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_alumnifeedbackoncompany_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "alumnijobposition",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    postedDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false),
                    postedbytype = table.Column<int>(type: "integer", nullable: false),
                    postedbyId = table.Column<string>(type: "text", nullable: true),
                    postedbyEmployeeId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumnijobposition", x => x.id);
                    table.ForeignKey(
                        name: "FK_alumnijobposition_alumni_postedbyId",
                        column: x => x.postedbyId,
                        principalTable: "alumni",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_alumnijobposition_company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_alumnijobposition_companyemployee_postedbyEmployeeId",
                        column: x => x.postedbyEmployeeId,
                        principalTable: "companyemployee",
                        principalColumn: "EmployeeId");
                });

            // ===== Tables Dependent on Company Employee =====

            migrationBuilder.CreateTable(
                name: "employeefeedbackonstudent",
                columns: table => new
                {
                    RecordId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompnayEmpId = table.Column<string>(type: "text", nullable: false),
                    CompanyEmpId = table.Column<string>(type: "text", nullable: true),
                    BatchId = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employeefeedbackonstudent", x => x.RecordId);
                    table.ForeignKey(
                        name: "FK_employeefeedbackonstudent_companyemployee_CompanyEmpId",
                        column: x => x.CompanyEmpId,
                        principalTable: "companyemployee",
                        principalColumn: "EmployeeId");
                });

            // ===== Create Indexes =====

            migrationBuilder.CreateIndex(
                name: "IX_alumni_CompanyId",
                table: "alumni",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_alumnifeedbackonCompanyId",
                table: "alumnifeedbackoncompany",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_alumnifeedbackoncompany_CompanyId",
                table: "alumnifeedbackoncompany",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_CompanyId",
                table: "alumnijobposition",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_postedbyId",
                table: "alumnijobposition",
                column: "postedbyId");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_postedbyEmployeeId",
                table: "alumnijobposition",
                column: "postedbyEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_companyemployee_CompanyId",
                table: "companyemployee",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_employeefeedbackonstudent_CompanyEmpId",
                table: "employeefeedbackonstudent",
                column: "CompanyEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_experienceopening_CompanyId",
                table: "experienceopening",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_foodReview_CompanyId",
                table: "foodReview",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_foodReview_RestaurentId",
                table: "foodReview",
                column: "RestaurentId");

            migrationBuilder.CreateIndex(
                name: "IX_placement_CompanyId",
                table: "placement",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_placement_Id",
                table: "placement",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_teacherresearchopening_Id",
                table: "teacherresearchopening",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "employeefeedbackonstudent");
            migrationBuilder.DropTable(name: "alumnijobposition");
            migrationBuilder.DropTable(name: "alumnifeedbackoncompany");
            migrationBuilder.DropTable(name: "placement");
            migrationBuilder.DropTable(name: "teacherresearchopening");
            migrationBuilder.DropTable(name: "foodReview");
            migrationBuilder.DropTable(name: "experienceopening");
            migrationBuilder.DropTable(name: "companyemployee");
            migrationBuilder.DropTable(name: "alumni");
            migrationBuilder.DropTable(name: "student");
            migrationBuilder.DropTable(name: "teacher");
            migrationBuilder.DropTable(name: "restaurents");
            migrationBuilder.DropTable(name: "company");
        }
    }
}

