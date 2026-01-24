-- Alumni Statistics Query
-- Returns overall alumni statistics
SELECT 
    COUNT(*)::INT AS total_alumni,
    COUNT(DISTINCT companyid)::INT AS unique_companies
FROM alumni
