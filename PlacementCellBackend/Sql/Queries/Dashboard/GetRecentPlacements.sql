-- Recent Placements Query
-- Returns the most recent placements with student and company details
-- Parameter: p_count (number of placements to return)
SELECT 
    p.id::INT AS placement_id,
    p.studentid::VARCHAR AS student_id,
    COALESCE(s.name, 'Unknown')::VARCHAR AS student_name,
    COALESCE(c.company_name, 'Unknown')::VARCHAR AS company_name,
    p.jobtitle::VARCHAR AS job_title,
    p.placementdate::DATE AS placement_date,
    p.package::VARCHAR AS package
FROM placement p
LEFT JOIN student s ON p.studentid = s.studentid
LEFT JOIN company c ON p.companyid = c.company_id
ORDER BY p.placementdate DESC
LIMIT :p_count
