-- Monthly Placement Data Query
-- Returns placement data grouped by month for a specific year
-- Parameter: p_year (year to filter)
SELECT 
    EXTRACT(MONTH FROM p.placementDate)::INT AS month,
    TRIM(TO_CHAR(p.placementDate, 'Month'))::VARCHAR AS month_name,
    COUNT(*)::INT AS placement_count
FROM placement p
WHERE EXTRACT(YEAR FROM p.placementDate) = :p_year
GROUP BY EXTRACT(MONTH FROM p.placementDate), TO_CHAR(p.placementDate, 'Month')
ORDER BY month
