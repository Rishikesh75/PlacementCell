using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAlumniPlacementsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "alumniplacements",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    alumniid = table.Column<string>(type: "text", nullable: false),
                    companyid = table.Column<string>(type: "text", nullable: false),
                    jobtitle = table.Column<string>(type: "text", nullable: false),
                    placementdate = table.Column<DateOnly>(type: "date", nullable: false),
                    package = table.Column<string>(type: "text", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_alumniplacements_alumniid",
                table: "alumniplacements",
                column: "alumniid");

            migrationBuilder.CreateIndex(
                name: "IX_alumniplacements_companyid",
                table: "alumniplacements",
                column: "companyid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alumniplacements");
        }
    }
}
