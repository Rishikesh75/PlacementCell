-- Dashboard Statistics Query
-- Returns overall counts for the placement cell dashboard
SELECT 
    (SELECT COUNT(*)::INT FROM student) AS total_students,
    (SELECT COUNT(*)::INT FROM alumni) AS total_alumni,
    (SELECT COUNT(*)::INT FROM company) AS total_companies,
    (SELECT COUNT(*)::INT FROM alumnifeedbackoncompany) AS total_feedbacks,
    (SELECT COUNT(*)::INT FROM experienceopening) AS active_openings,
    (SELECT COUNT(*)::INT FROM teacher) AS total_teachers
