-- Yearly Placement Data Query
-- Returns placement data grouped by year
SELECT 
    EXTRACT(YEAR FROM p.placementDate)::INT AS year,
    COUNT(*)::INT AS total_placements,
    COUNT(DISTINCT p.CompanyId)::INT AS unique_companies
FROM placement p
GROUP BY EXTRACT(YEAR FROM p.placementDate)
ORDER BY year DESC
