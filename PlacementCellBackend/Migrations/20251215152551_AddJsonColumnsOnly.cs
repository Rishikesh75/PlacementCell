using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlacementCellBackend.Migrations;

/// <inheritdoc />
public partial class AddJsonColumnsOnly : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Use raw SQL to safely add columns only if they don't exist
        migrationBuilder.Sql(@"
                DO $$ 
                BEGIN
                    -- Add CodingRound columns
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='CodingRoundInfo_Questions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""CodingRoundInfo_Questions"" jsonb NULL;
                    END IF;
                    
                    -- Add HRRound columns
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='HRRoundInfo_SituationBasedQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""HRRoundInfo_SituationBasedQuestions"" jsonb NULL;
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='HRRoundInfo_UnExpectedQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""HRRoundInfo_UnExpectedQuestions"" jsonb NULL;
                    END IF;
                    
                    -- Add TechnicalRound columns
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='TechnicalRoundInfo_DSAQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""TechnicalRoundInfo_DSAQuestions"" jsonb NULL;
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='TechnicalRoundInfo_DBMSQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""TechnicalRoundInfo_DBMSQuestions"" jsonb NULL;
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='TechnicalRoundInfo_SystemDesignQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""TechnicalRoundInfo_SystemDesignQuestions"" jsonb NULL;
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='TechnicalRoundInfo_PuzzleBasedQuestions') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""TechnicalRoundInfo_PuzzleBasedQuestions"" jsonb NULL;
                    END IF;
                    
                    -- Add Resources column
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='feedbackoncompany' AND column_name='ResourcesInfo_ResourcesList') THEN
                        ALTER TABLE feedbackoncompany ADD COLUMN ""ResourcesInfo_ResourcesList"" jsonb NULL;
                    END IF;
                END $$;
            ");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // Drop only the JSON columns we added
        migrationBuilder.Sql(@"
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""CodingRoundInfo_Questions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""HRRoundInfo_SituationBasedQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""HRRoundInfo_UnExpectedQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""TechnicalRoundInfo_DSAQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""TechnicalRoundInfo_DBMSQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""TechnicalRoundInfo_SystemDesignQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""TechnicalRoundInfo_PuzzleBasedQuestions"";
                ALTER TABLE feedbackoncompany DROP COLUMN IF EXISTS ""ResourcesInfo_ResourcesList"";
            ");
    }
}
