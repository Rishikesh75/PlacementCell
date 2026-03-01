-- Company Yearly Placements Query
-- Returns yearly placement count for a specific company
-- Parameter: p_CompanyId (company identifier)
SELECT 
    EXTRACT(YEAR FROM p.placementDate)::INT AS year,
    COUNT(*)::INT AS placement_count
FROM placement p
WHERE p.CompanyId = :p_CompanyId
GROUP BY EXTRACT(YEAR FROM p.placementDate)
ORDER BY year DESC
