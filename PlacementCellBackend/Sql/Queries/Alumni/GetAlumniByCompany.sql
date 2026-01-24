-- Alumni By Company Query
-- Returns alumni count grouped by company
SELECT 
    a.companyid::VARCHAR AS company_id,
    COALESCE(c.company_name, 'Unknown')::VARCHAR AS company_name,
    COUNT(*)::INT AS total_alumni_count
FROM alumni a
LEFT JOIN company c ON a.companyid = c.company_id
GROUP BY a.companyid, c.company_name
ORDER BY total_alumni_count DESC
