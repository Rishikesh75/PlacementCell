-- Positions By Company Query
-- Returns position distribution for a specific company
-- Parameter: p_company_id (company identifier)
SELECT 
    a.position::VARCHAR AS position_name,
    COUNT(*)::INT AS total_count
FROM alumni a
WHERE a.companyid = :p_company_id 
  AND a.position IS NOT NULL 
  AND a.position != ''
GROUP BY a.position
ORDER BY total_count DESC
