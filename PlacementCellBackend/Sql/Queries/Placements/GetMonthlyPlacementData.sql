-- Monthly Placement Data Query
-- Returns placement data grouped by month for a specific year
-- Parameter: p_year (year to filter)
SELECT 
    EXTRACT(MONTH FROM p.placementdate)::INT AS month,
    TRIM(TO_CHAR(p.placementdate, 'Month'))::VARCHAR AS month_name,
    COUNT(*)::INT AS placement_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.placementdate) = :p_year
GROUP BY EXTRACT(MONTH FROM p.placementdate), TO_CHAR(p.placementdate, 'Month')
ORDER BY month
