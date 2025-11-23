using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    phoneno = table.Column<string>(type: "text", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "food",
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
                    table.PrimaryKey("PK_food", x => x.id);
                    table.ForeignKey(
                        name: "FK_food_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_food_restaurents_restaurentid",
                        column: x => x.restaurentid,
                        principalTable: "restaurents",
                        principalColumn: "restaurentid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teacherplacements",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    teacherid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    employeeemail = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teacherplacements", x => x.id);
                    table.ForeignKey(
                        name: "FK_teacherplacements_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_teacherplacements_teacher_teacherid",
                        column: x => x.teacherid,
                        principalTable: "teacher",
                        principalColumn: "teacher_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "feedbackoncompany",
                columns: table => new
                {
                    feedbackid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    alumniid = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feedbackoncompany", x => x.feedbackid);
                    table.ForeignKey(
                        name: "FK_feedbackoncompany_alumni_alumniid",
                        column: x => x.alumniid,
                        principalTable: "alumni",
                        principalColumn: "alumniid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_feedbackoncompany_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "employeeonstudent",
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
                    table.PrimaryKey("PK_employeeonstudent", x => x.RecordId);
                    table.ForeignKey(
                        name: "FK_employeeonstudent_companyemployee_CompanyEmpId",
                        column: x => x.CompanyEmpId,
                        principalTable: "companyemployee",
                        principalColumn: "employeeid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_alumni_companyid",
                table: "alumni",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_companyemployee_companyid",
                table: "companyemployee",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_employeeonstudent_CompanyEmpId",
                table: "employeeonstudent",
                column: "CompanyEmpId");

            migrationBuilder.CreateIndex(
                name: "IX_experienceopening_companyid",
                table: "experienceopening",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_feedbackoncompany_alumniid",
                table: "feedbackoncompany",
                column: "alumniid");

            migrationBuilder.CreateIndex(
                name: "IX_feedbackoncompany_companyid",
                table: "feedbackoncompany",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_food_companyid",
                table: "food",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_food_restaurentid",
                table: "food",
                column: "restaurentid");

            migrationBuilder.CreateIndex(
                name: "IX_teacherplacements_companyid",
                table: "teacherplacements",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_teacherplacements_teacherid",
                table: "teacherplacements",
                column: "teacherid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employeeonstudent");

            migrationBuilder.DropTable(
                name: "experienceopening");

            migrationBuilder.DropTable(
                name: "feedbackoncompany");

            migrationBuilder.DropTable(
                name: "food");

            migrationBuilder.DropTable(
                name: "student");

            migrationBuilder.DropTable(
                name: "teacherplacements");

            migrationBuilder.DropTable(
                name: "companyemployee");

            migrationBuilder.DropTable(
                name: "alumni");

            migrationBuilder.DropTable(
                name: "restaurents");

            migrationBuilder.DropTable(
                name: "teacher");

            migrationBuilder.DropTable(
                name: "company");
        }
    }
}
