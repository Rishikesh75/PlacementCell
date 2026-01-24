-- Company Yearly Placements Query
-- Returns yearly placement count for a specific company
-- Parameter: p_company_id (company identifier)
SELECT 
    EXTRACT(YEAR FROM p.placementdate)::INT AS year,
    COUNT(*)::INT AS placement_count
FROM placement p
WHERE p.companyid = :p_company_id
GROUP BY EXTRACT(YEAR FROM p.placementdate)
ORDER BY year DESC
