-- Top Companies Ranking Query
-- Returns top N companies ranked by number of placements
-- Parameter: p_top_n (number of companies to return)
SELECT 
    p.CompanyId::VARCHAR AS CompanyId,
    COALESCE(c.CompanyName, 'Unknown')::VARCHAR AS CompanyName,
    COALESCE(c.Industry, 'Unknown')::VARCHAR AS Industry,
    COUNT(*)::INT AS total_placements,
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC)::INT AS rank,
    AVG(
        CASE 
            WHEN p.Package ~ '^\d+\.?\d*' THEN 
                CAST(REGEXP_REPLACE(UPPER(p.Package), '[^0-9.]', '', 'g') AS DECIMAL)
            ELSE 0 
        END
    )::DECIMAL AS average_Package
FROM placement p
LEFT JOIN company c ON p.CompanyId = c.CompanyId
GROUP BY p.CompanyId, c.CompanyName, c.Industry
ORDER BY total_placements DESC
LIMIT :p_top_n
