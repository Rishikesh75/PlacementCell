-- Company Insights Query
-- Returns detailed insights for a specific company
-- Parameter: p_company_id (company identifier)
SELECT 
    c.company_id::VARCHAR AS company_id,
    c.company_name::VARCHAR AS company_name,
    c.industry::VARCHAR AS industry,
    (SELECT COUNT(*)::INT FROM alumni a WHERE a.companyid = :p_company_id) AS total_alumni_placed,
    (SELECT COUNT(*)::INT FROM alumnifeedbackoncompany f WHERE f.companyid = :p_company_id) AS total_feedbacks,
    COALESCE(
        (SELECT AVG(
            CASE 
                WHEN f."CTC" ~ '^\d+\.?\d*' THEN 
                    CAST(REGEXP_REPLACE(UPPER(f."CTC"), '[^0-9.]', '', 'g') AS DECIMAL)
                ELSE 0 
            END
        ) FROM alumnifeedbackoncompany f WHERE f.companyid = :p_company_id),
        0
    )::DECIMAL AS average_ctc,
    (SELECT ARRAY_AGG(DISTINCT f."JobProfile") 
     FROM alumnifeedbackoncompany f 
     WHERE f.companyid = :p_company_id AND f."JobProfile" IS NOT NULL)::TEXT[] AS job_profiles,
    (SELECT ARRAY_AGG(DISTINCT f."JobLocation") 
     FROM alumnifeedbackoncompany f 
     WHERE f.companyid = :p_company_id AND f."JobLocation" IS NOT NULL)::TEXT[] AS locations
FROM company c
WHERE c.company_id = :p_company_id
