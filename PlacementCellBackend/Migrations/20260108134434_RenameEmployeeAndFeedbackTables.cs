using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenameEmployeeAndFeedbackTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ===== Rename employeeonstudent to employeefeedbackonstudent =====
            
            // Rename the table
            migrationBuilder.RenameTable(
                name: "employeeonstudent",
                newName: "employeefeedbackonstudent");

            // Rename the primary key constraint
            migrationBuilder.RenameIndex(
                name: "PK_employeeonstudent",
                table: "employeefeedbackonstudent",
                newName: "PK_employeefeedbackonstudent");

            // Rename the foreign key index
            migrationBuilder.RenameIndex(
                name: "IX_employeeonstudent_CompanyEmpId",
                table: "employeefeedbackonstudent",
                newName: "IX_employeefeedbackonstudent_CompanyEmpId");

            // Drop old foreign key and add new one with correct name
            migrationBuilder.DropForeignKey(
                name: "FK_employeeonstudent_companyemployee_CompanyEmpId",
                table: "employeefeedbackonstudent");

            migrationBuilder.AddForeignKey(
                name: "FK_employeefeedbackonstudent_companyemployee_CompanyEmpId",
                table: "employeefeedbackonstudent",
                column: "CompanyEmpId",
                principalTable: "companyemployee",
                principalColumn: "employeeid");

            // ===== Rename feedbackoncompany to alumnifeedbackoncompany =====
            
            // Rename the table
            migrationBuilder.RenameTable(
                name: "feedbackoncompany",
                newName: "alumnifeedbackoncompany");

            // Rename the primary key constraint
            migrationBuilder.RenameIndex(
                name: "PK_feedbackoncompany",
                table: "alumnifeedbackoncompany",
                newName: "PK_alumnifeedbackoncompany");

            // Rename the foreign key indexes
            migrationBuilder.RenameIndex(
                name: "IX_feedbackoncompany_alumniid",
                table: "alumnifeedbackoncompany",
                newName: "IX_alumnifeedbackoncompany_alumniid");

            migrationBuilder.RenameIndex(
                name: "IX_feedbackoncompany_companyid",
                table: "alumnifeedbackoncompany",
                newName: "IX_alumnifeedbackoncompany_companyid");

            // Drop old foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_feedbackoncompany_alumni_alumniid",
                table: "alumnifeedbackoncompany");

            migrationBuilder.DropForeignKey(
                name: "FK_feedbackoncompany_company_companyid",
                table: "alumnifeedbackoncompany");

            // Add new foreign keys with updated names
            migrationBuilder.AddForeignKey(
                name: "FK_alumnifeedbackoncompany_alumni_alumniid",
                table: "alumnifeedbackoncompany",
                column: "alumniid",
                principalTable: "alumni",
                principalColumn: "alumniid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_alumnifeedbackoncompany_company_companyid",
                table: "alumnifeedbackoncompany",
                column: "companyid",
                principalTable: "company",
                principalColumn: "company_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // ===== Revert alumnifeedbackoncompany back to feedbackoncompany =====
            
            // Drop new foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_alumnifeedbackoncompany_alumni_alumniid",
                table: "alumnifeedbackoncompany");

            migrationBuilder.DropForeignKey(
                name: "FK_alumnifeedbackoncompany_company_companyid",
                table: "alumnifeedbackoncompany");

            // Add old foreign keys back
            migrationBuilder.AddForeignKey(
                name: "FK_feedbackoncompany_alumni_alumniid",
                table: "alumnifeedbackoncompany",
                column: "alumniid",
                principalTable: "alumni",
                principalColumn: "alumniid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_feedbackoncompany_company_companyid",
                table: "alumnifeedbackoncompany",
                column: "companyid",
                principalTable: "company",
                principalColumn: "company_id",
                onDelete: ReferentialAction.Cascade);

            // Rename indexes back
            migrationBuilder.RenameIndex(
                name: "IX_alumnifeedbackoncompany_alumniid",
                table: "alumnifeedbackoncompany",
                newName: "IX_feedbackoncompany_alumniid");

            migrationBuilder.RenameIndex(
                name: "IX_alumnifeedbackoncompany_companyid",
                table: "alumnifeedbackoncompany",
                newName: "IX_feedbackoncompany_companyid");

            // Rename primary key back
            migrationBuilder.RenameIndex(
                name: "PK_alumnifeedbackoncompany",
                table: "alumnifeedbackoncompany",
                newName: "PK_feedbackoncompany");

            // Rename the table back
            migrationBuilder.RenameTable(
                name: "alumnifeedbackoncompany",
                newName: "feedbackoncompany");

            // ===== Revert employeefeedbackonstudent back to employeeonstudent =====
            
            // Drop new foreign key
            migrationBuilder.DropForeignKey(
                name: "FK_employeefeedbackonstudent_companyemployee_CompanyEmpId",
                table: "employeefeedbackonstudent");

            // Add old foreign key back
            migrationBuilder.AddForeignKey(
                name: "FK_employeeonstudent_companyemployee_CompanyEmpId",
                table: "employeefeedbackonstudent",
                column: "CompanyEmpId",
                principalTable: "companyemployee",
                principalColumn: "employeeid");

            // Rename index back
            migrationBuilder.RenameIndex(
                name: "IX_employeefeedbackonstudent_CompanyEmpId",
                table: "employeefeedbackonstudent",
                newName: "IX_employeeonstudent_CompanyEmpId");

            // Rename primary key back
            migrationBuilder.RenameIndex(
                name: "PK_employeefeedbackonstudent",
                table: "employeefeedbackonstudent",
                newName: "PK_employeeonstudent");

            // Rename the table back
            migrationBuilder.RenameTable(
                name: "employeefeedbackonstudent",
                newName: "employeeonstudent");
        }
    }
}
