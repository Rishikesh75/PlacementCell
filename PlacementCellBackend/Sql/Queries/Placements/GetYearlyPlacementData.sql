-- Yearly Placement Data Query
-- Returns placement data grouped by year
SELECT 
    EXTRACT(YEAR FROM p.placementdate)::INT AS year,
    COUNT(*)::INT AS total_placements,
    COUNT(DISTINCT p.companyid)::INT AS unique_companies
FROM placement p
GROUP BY EXTRACT(YEAR FROM p.placementdate)
ORDER BY year DESC
