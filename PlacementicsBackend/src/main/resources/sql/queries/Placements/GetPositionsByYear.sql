-- Positions By Year Query
-- Returns position distribution for a specific year
-- Parameter: p_year (year to filter)
SELECT 
    p.JobTitle::VARCHAR AS position_name,
    COUNT(*)::INT AS total_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.PlacementDate) = :p_year
  AND p.JobTitle IS NOT NULL 
  AND p.JobTitle != ''
GROUP BY p.JobTitle
ORDER BY total_count DESC
