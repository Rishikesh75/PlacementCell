-- Top Companies Ranking Query
-- Returns top N companies ranked by number of placements
-- Parameter: p_top_n (number of companies to return)
SELECT 
    p.companyid::VARCHAR AS company_id,
    COALESCE(c.company_name, 'Unknown')::VARCHAR AS company_name,
    COALESCE(c.industry, 'Unknown')::VARCHAR AS industry,
    COUNT(*)::INT AS total_placements,
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC)::INT AS rank,
    AVG(
        CASE 
            WHEN p.package ~ '^\d+\.?\d*' THEN 
                CAST(REGEXP_REPLACE(UPPER(p.package), '[^0-9.]', '', 'g') AS DECIMAL)
            ELSE 0 
        END
    )::DECIMAL AS average_package
FROM placement p
LEFT JOIN company c ON p.companyid = c.company_id
GROUP BY p.companyid, c.company_name, c.industry
ORDER BY total_placements DESC
LIMIT :p_top_n
