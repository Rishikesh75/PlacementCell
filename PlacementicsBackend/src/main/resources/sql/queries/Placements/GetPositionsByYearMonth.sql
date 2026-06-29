-- Positions By Year and Month Query
-- Returns position distribution for a specific year and month
-- Parameters: p_year (year), p_month (month)
SELECT 
    p.JobTitle::VARCHAR AS position_name,
    COUNT(*)::INT AS total_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.PlacementDate) = :p_year
  AND EXTRACT(MONTH FROM p.PlacementDate) = :p_month
  AND p.JobTitle IS NOT NULL 
  AND p.JobTitle != ''
GROUP BY p.JobTitle
ORDER BY total_count DESC
