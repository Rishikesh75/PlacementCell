using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenameTeacherPlacementsToResearchOpening : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alumniplacements");

            migrationBuilder.DropTable(
                name: "teacherplacements");

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
                name: "IX_teacherresearchopening_teacherid",
                table: "teacherresearchopening",
                column: "teacherid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alumnijobposition");

            migrationBuilder.DropTable(
                name: "teacherresearchopening");

            migrationBuilder.CreateTable(
                name: "alumniplacements",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    alumniid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false),
                    placementdate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_alumniplacements", x => x.id);
                    table.ForeignKey(
                        name: "FK_alumniplacements_alumni_alumniid",
                        column: x => x.alumniid,
                        principalTable: "alumni",
                        principalColumn: "alumniid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_alumniplacements_company_companyid",
                        column: x => x.companyid,
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "teacherplacements",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    teacherid = table.Column<string>(type: "text", nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_alumniplacements_alumniid",
                table: "alumniplacements",
                column: "alumniid");

            migrationBuilder.CreateIndex(
                name: "IX_alumniplacements_companyid",
                table: "alumniplacements",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_teacherplacements_companyid",
                table: "teacherplacements",
                column: "companyid");

            migrationBuilder.CreateIndex(
                name: "IX_teacherplacements_teacherid",
                table: "teacherplacements",
                column: "teacherid");
        }
    }
}
