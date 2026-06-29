-- Alumni By Company Query
-- Returns alumni count grouped by company
SELECT 
    a.CompanyId::VARCHAR AS CompanyId,
    COALESCE(c.CompanyName, 'Unknown')::VARCHAR AS CompanyName,
    COUNT(*)::INT AS total_alumni_count
FROM alumni a
LEFT JOIN company c ON a.CompanyId = c.CompanyId
GROUP BY a.CompanyId, c.CompanyName
ORDER BY total_alumni_count DESC
