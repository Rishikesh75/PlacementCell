-- Recent Placements Query
-- Returns the most recent placements with student and company details
-- Parameter: p_count (number of placements to return)
SELECT 
    p.id::INT AS placement_id,
    p.Id::VARCHAR AS student_id,
    COALESCE(s.name, 'Unknown')::VARCHAR AS student_name,
    COALESCE(c.CompanyName, 'Unknown')::VARCHAR AS CompanyName,
    p.jobtitle::VARCHAR AS job_title,
    p.placementDate::Date AS placement_Date,
    p.package::VARCHAR AS package
FROM placement p
LEFT JOIN student s ON p.Id = s.Id
LEFT JOIN company c ON p.CompanyId = c.CompanyId
ORDER BY p.placementDate DESC
LIMIT :p_count
