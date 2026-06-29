-- Company Insights Query
-- Returns detailed insights for a specific company
-- Parameter: p_CompanyId (company identifier)
SELECT 
    c.CompanyId::VARCHAR AS CompanyId,
    c.CompanyName::VARCHAR AS CompanyName,
    c.Industry::VARCHAR AS Industry,
    (SELECT COUNT(*)::INT FROM alumni a WHERE a.CompanyId = :p_CompanyId) AS total_alumni_placed,
    (SELECT COUNT(*)::INT FROM alumnifeedbackoncompany f WHERE f.CompanyId = :p_CompanyId) AS total_feedbacks,
    COALESCE(
        (SELECT AVG(
            CASE 
                WHEN f."CTC" ~ '^\d+\.?\d*' THEN 
                    CAST(REGEXP_REPLACE(UPPER(f."CTC"), '[^0-9.]', '', 'g') AS DECIMAL)
                ELSE 0 
            END
        ) FROM alumnifeedbackoncompany f WHERE f.CompanyId = :p_CompanyId),
        0
    )::DECIMAL AS average_ctc,
    (SELECT ARRAY_AGG(DISTINCT f."JobProfile") 
     FROM alumnifeedbackoncompany f 
     WHERE f.CompanyId = :p_CompanyId AND f."JobProfile" IS NOT NULL)::TEXT[] AS job_profiles,
    (SELECT ARRAY_AGG(DISTINCT f."JobLocation") 
     FROM alumnifeedbackoncompany f 
     WHERE f.CompanyId = :p_CompanyId AND f."JobLocation" IS NOT NULL)::TEXT[] AS locations
FROM company c
WHERE c.CompanyId = :p_CompanyId
