-- Positions By Year Query
-- Returns position distribution for a specific year
-- Parameter: p_year (year to filter)
SELECT 
    p.jobtitle::VARCHAR AS position_name,
    COUNT(*)::INT AS total_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.placementdate) = :p_year
  AND p.jobtitle IS NOT NULL 
  AND p.jobtitle != ''
GROUP BY p.jobtitle
ORDER BY total_count DESC
