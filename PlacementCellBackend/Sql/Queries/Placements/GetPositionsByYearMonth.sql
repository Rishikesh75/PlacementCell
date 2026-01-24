-- Positions By Year and Month Query
-- Returns position distribution for a specific year and month
-- Parameters: p_year (year), p_month (month)
SELECT 
    p.jobtitle::VARCHAR AS position_name,
    COUNT(*)::INT AS total_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.placementdate) = :p_year
  AND EXTRACT(MONTH FROM p.placementdate) = :p_month
  AND p.jobtitle IS NOT NULL 
  AND p.jobtitle != ''
GROUP BY p.jobtitle
ORDER BY total_count DESC
