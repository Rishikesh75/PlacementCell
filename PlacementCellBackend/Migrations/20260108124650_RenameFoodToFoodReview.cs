using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlacementCellBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenameFoodToFoodReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Rename the table from 'food' to 'foodReview'
            migrationBuilder.RenameTable(
                name: "food",
                newName: "foodReview");

            // Rename the primary key constraint
            migrationBuilder.RenameIndex(
                name: "PK_food",
                table: "foodReview",
                newName: "PK_foodReview");

            // Rename the foreign key indexes
            migrationBuilder.RenameIndex(
                name: "IX_food_companyid",
                table: "foodReview",
                newName: "IX_foodReview_companyid");

            migrationBuilder.RenameIndex(
                name: "IX_food_restaurentid",
                table: "foodReview",
                newName: "IX_foodReview_restaurentid");

            // Drop old foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_food_company_companyid",
                table: "foodReview");

            migrationBuilder.DropForeignKey(
                name: "FK_food_restaurents_restaurentid",
                table: "foodReview");

            // Add new foreign keys with updated names
            migrationBuilder.AddForeignKey(
                name: "FK_foodReview_company_companyid",
                table: "foodReview",
                column: "companyid",
                principalTable: "company",
                principalColumn: "company_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_foodReview_restaurents_restaurentid",
                table: "foodReview",
                column: "restaurentid",
                principalTable: "restaurents",
                principalColumn: "restaurentid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop new foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_foodReview_company_companyid",
                table: "foodReview");

            migrationBuilder.DropForeignKey(
                name: "FK_foodReview_restaurents_restaurentid",
                table: "foodReview");

            // Add old foreign keys back
            migrationBuilder.AddForeignKey(
                name: "FK_food_company_companyid",
                table: "foodReview",
                column: "companyid",
                principalTable: "company",
                principalColumn: "company_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_food_restaurents_restaurentid",
                table: "foodReview",
                column: "restaurentid",
                principalTable: "restaurents",
                principalColumn: "restaurentid",
                onDelete: ReferentialAction.Cascade);

            // Rename indexes back
            migrationBuilder.RenameIndex(
                name: "IX_foodReview_companyid",
                table: "foodReview",
                newName: "IX_food_companyid");

            migrationBuilder.RenameIndex(
                name: "IX_foodReview_restaurentid",
                table: "foodReview",
                newName: "IX_food_restaurentid");

            // Rename primary key back
            migrationBuilder.RenameIndex(
                name: "PK_foodReview",
                table: "foodReview",
                newName: "PK_food");

            // Rename the table back from 'foodReview' to 'food'
            migrationBuilder.RenameTable(
                name: "foodReview",
                newName: "food");
        }
    }
}
