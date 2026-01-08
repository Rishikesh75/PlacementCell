using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using PlacementCellBackend.Models.InterviewRounds;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateResourcesToLinksAndBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ResourcesInfo_ResourcesList",
                table: "alumnifeedbackoncompany",
                newName: "ResourcesInfo_Links");

            migrationBuilder.AddColumn<List<BookResource>>(
                name: "ResourcesInfo_Books",
                table: "alumnifeedbackoncompany",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResourcesInfo_Books",
                table: "alumnifeedbackoncompany");

            migrationBuilder.RenameColumn(
                name: "ResourcesInfo_Links",
                table: "alumnifeedbackoncompany",
                newName: "ResourcesInfo_ResourcesList");
        }
    }
}
