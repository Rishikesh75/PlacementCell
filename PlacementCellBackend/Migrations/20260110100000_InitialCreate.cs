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
                    company_id = table.Column<string>(type: "text", nullable: false),
                    company_name = table.Column<string>(type: "text", nullable: false),
                    industry = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company", x => x.company_id);
                });

            migrationBuilder.CreateTable(
                name: "restaurents",
                columns: table => new
                {
                    restaurentid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    contact = table.Column<string>(type: "text", nullable: false),
                    address = table.Column<string>(type: "text", nullable: false),
                    rating = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurents", x => x.restaurentid);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    studentid = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    major = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    graduationyear = table.Column<long>(type: "bigint", nullable: false),
                    phoneno = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student", x => x.studentid);
                });

            migrationBuilder.CreateTable(
                name: "teacher",
                columns: table => new
                {
                    teacher_id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacher", x => x.teacher_id);
                });

            // ===== Tables with Foreign Key to Company =====

            migrationBuilder.CreateTable(
                name: "alumni",
                columns: table => new
                {
                    alumniid = table.Column<string>(type: "text", nullable: false),
                    position = table.Column<string>(type: "text", nullable: false),
                    linkdinprofile = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumni", x => x.alumniid);
                    table.ForeignKey(
                        name: "FK_alumni_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "companyemployee",
                columns: table => new
                {
                    employeeid = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    designation = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companyemployee", x => x.employeeid);
                    table.ForeignKey(
                        name: "FK_companyemployee_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "experienceopening",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    jobid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    experiencerequired = table.Column<string>(type: "text", nullable: false),
                    companyempemail = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_experienceopening", x => x.id);
                    table.ForeignKey(
                        name: "FK_experienceopening_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            // ===== Tables with Multiple Foreign Keys =====

            migrationBuilder.CreateTable(
                name: "foodReview",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    restaurentid = table.Column<int>(type: "integer", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_foodReview", x => x.id);
                    table.ForeignKey(
                        name: "FK_foodReview_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_foodReview_restaurents_restaurentid",
                        column: x => x.restaurentid,
                        principalTable: "restaurents",
                        principalColumn: "restaurentid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teacherresearchopening",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    teacherid = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    researcharea = table.Column<string>(type: "text", nullable: false),
                    stipend = table.Column<string>(type: "text", nullable: false),
                    duration = table.Column<string>(type: "text", nullable: false),
                    posteddate = table.Column<DateOnly>(type: "date", nullable: false),
                    deadline = table.Column<DateOnly>(type: "date", nullable: true),
                    isactive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacherresearchopening", x => x.id);
                    table.ForeignKey(
                        name: "FK_teacherresearchopening_teacher_teacherid",
                        column: x => x.teacherid,
                        principalTable: "teacher",
                        principalColumn: "teacher_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "placement",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    studentid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    placementdate = table.Column<DateOnly>(type: "date", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_placement", x => x.id);
                    table.ForeignKey(
                        name: "FK_placement_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_placement_student_studentid",
                        column: x => x.studentid,
                        principalTable: "student",
                        principalColumn: "studentid",
                        onDelete: ReferentialAction.Cascade);
                });

            // ===== Tables Dependent on Alumni =====

            migrationBuilder.CreateTable(
                name: "alumnifeedbackoncompany",
                columns: table => new
                {
                    feedbackid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    alumniid = table.Column<string>(type: "text", nullable: false),
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
                        name: "FK_alumnifeedbackoncompany_alumni_alumniid",
                        column: x => x.alumniid,
                        principalTable: "alumni",
                        principalColumn: "alumniid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_alumnifeedbackoncompany_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "alumnijobposition",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    posteddate = table.Column<DateOnly>(type: "date", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false),
                    postedbytype = table.Column<int>(type: "integer", nullable: false),
                    postedbyalumniid = table.Column<string>(type: "text", nullable: true),
                    postedbyemployeeid = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumnijobposition", x => x.id);
                    table.ForeignKey(
                        name: "FK_alumnijobposition_alumni_postedbyalumniid",
                        column: x => x.postedbyalumniid,
                        principalTable: "alumni",
                        principalColumn: "alumniid");
                    table.ForeignKey(
                        name: "FK_alumnijobposition_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_alumnijobposition_companyemployee_postedbyemployeeid",
                        column: x => x.postedbyemployeeid,
                        principalTable: "companyemployee",
                        principalColumn: "employeeid");
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
                        principalColumn: "employeeid");
                });

            // ===== Create Indexes =====

            migrationBuilder.CreateIndex(
                name: "IX_alumni_companyid",
                table: "alumni",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_alumnifeedbackoncompany_alumniid",
                table: "alumnifeedbackoncompany",
                column: "alumniid");

            migrationBuilder.CreateIndex(
                name: "IX_alumnifeedbackoncompany_companyid",
                table: "alumnifeedbackoncompany",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_companyid",
                table: "alumnijobposition",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_postedbyalumniid",
                table: "alumnijobposition",
                column: "postedbyalumniid");

            migrationBuilder.CreateIndex(
                name: "IX_alumnijobposition_postedbyemployeeid",
                table: "alumnijobposition",
                column: "postedbyemployeeid");

            migrationBuilder.CreateIndex(
                name: "IX_companyemployee_companyid",
                table: "companyemployee",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_employeefeedbackonstudent_CompanyEmpId",
                table: "employeefeedbackonstudent",
                column: "CompanyEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_experienceopening_companyid",
                table: "experienceopening",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_foodReview_companyid",
                table: "foodReview",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_foodReview_restaurentid",
                table: "foodReview",
                column: "restaurentid");

            migrationBuilder.CreateIndex(
                name: "IX_placement_companyid",
                table: "placement",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_placement_studentid",
                table: "placement",
                column: "studentid");

            migrationBuilder.CreateIndex(
                name: "IX_teacherresearchopening_teacherid",
                table: "teacherresearchopening",
                column: "teacherid");
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

