-- -- ============================================================
-- -- SEED DATA
-- -- ============================================================

-- -- ============================================================
-- -- 1. COLLEGE
-- -- ============================================================

INSERT INTO college (
    id,
    name,
    address,
    contact,
    verified_status
)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'IIITDM Kancheepuram',
    'Chennai, Tamil Nadu',
    '+91-9876543210',
    TRUE
),
(
    '22222222-2222-2222-2222-222222222222',
    'IIT Madras',
    'Chennai, Tamil Nadu',
    '+91-9876543211',
    TRUE
);


-- -- ============================================================
-- -- 2. COMPANY
-- -- ============================================================

INSERT INTO company (
    id,
    name,
    industry
)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Microsoft',
    'Technology'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Google',
    'Technology'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Amazon',
    'E-Commerce'
),
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Adobe',
    'Software'
);


-- -- ============================================================
-- -- 3. STUDENT
-- -- ============================================================

INSERT INTO student (
    id,
    college_id,
    name,
    email,
    roll_no,
    batch,
    department
)
VALUES
(
    '10000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Ravi Kumar',
    'ravi@example.com',
    'CSE001',
    '2027',
    'Computer Science'
),
(
    '10000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Priya Sharma',
    'priya@example.com',
    'CSE002',
    '2027',
    'Computer Science'
),
(
    '10000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'Arjun Reddy',
    'arjun@example.com',
    'ECE001',
    '2027',
    'Electronics'
),
(
    '20000000-0000-0000-0000-000000000001',
    '22222222-2222-2222-2222-222222222222',
    'Karthik Rao',
    'karthik@example.com',
    'CS001',
    '2027',
    'Computer Science'
);


-- -- ============================================================
-- -- 4. ALUMNI
-- -- ============================================================

INSERT INTO alumni (
    id,
    college_id,
    name,
    email,
    company_id,
    designation,
    passing_year
)
VALUES
(
    '30000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Rahul Verma',
    'rahul@example.com',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Software Engineer',
    2022
),
(
    '30000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Sneha Reddy',
    'sneha@example.com',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Senior Software Engineer',
    2021
),
(
    '30000000-0000-0000-0000-000000000003',
    '22222222-2222-2222-2222-222222222222',
    'Vikram Singh',
    'vikram@example.com',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Software Development Engineer',
    2020
);


-- -- ============================================================
-- -- 5. TEACHER
-- -- ============================================================

INSERT INTO teacher (
    id,
    college_id,
    name,
    email,
    department,
    joining_year
)
VALUES
(
    '40000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Dr. Suresh Kumar',
    'suresh@college.edu',
    'Computer Science',
    2018
),
(
    '40000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Dr. Anitha Rao',
    'anitha@college.edu',
    'Electronics',
    2020
),
(
    '40000000-0000-0000-0000-000000000003',
    '22222222-2222-2222-2222-222222222222',
    'Dr. Rajesh Kumar',
    'rajesh@iitm.edu',
    'Computer Science',
    2015
);


-- -- ============================================================
-- -- 6. TPO
-- -- ============================================================

-- INSERT INTO tpo (
--     id,
--     college_id,
--     name,
--     email
-- )
-- VALUES
-- (
--     '50000000-0000-0000-0000-000000000001',
--     '11111111-1111-1111-1111-111111111111',
--     'Mahesh Kumar',
--     'tpo@iiitdm.ac.in'
-- ),
-- (
--     '50000000-0000-0000-0000-000000000002',
--     '22222222-2222-2222-2222-222222222222',
--     'Priya Menon',
--     'tpo@iitm.ac.in'
-- );


-- -- ============================================================
-- -- 7. COLLEGE COMPANY
-- -- ============================================================

INSERT INTO college_company (
    id,
    college_id,
    company_id,
    company_key
)
VALUES
(
    '60000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'IIITDM-MICROSOFT'
),
(
    '60000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'IIITDM-GOOGLE'
),
(
    '60000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'IIITDM-AMAZON'
),
(
    '60000000-0000-0000-0000-000000000004',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'IITM-MICROSOFT'
);


-- -- ============================================================
-- -- 8. PLACEMENT
-- -- ============================================================

INSERT INTO placement (
    id,
    student_id,
    college_company_id,
    package,
    role,
    placement_date
)
VALUES
(
    '70000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000001',
    1800000.00,
    'Software Engineer',
    '2026-08-01'
),
(
    '70000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    '60000000-0000-0000-0000-000000000002',
    2200000.00,
    'Software Engineer',
    '2026-08-05'
),
(
    '70000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000004',
    2000000.00,
    'Software Development Engineer',
    '2026-08-10'
);


-- -- ============================================================
-- -- 9. PLACEMENT OPPORTUNITY
-- -- ============================================================

-- -- Opportunity created by Alumni

INSERT INTO placement_opportunity (
    id,
    alumni_id,
    teacher_id,
    college_company_id,
    role,
    status,
    eligibility,
    deadline
)
VALUES
(
    '80000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    NULL,
    '60000000-0000-0000-0000-000000000001',
    'Software Engineer',
    'OPEN',
    'CGPA >= 7.5, No active backlogs, CSE/IT students',
    '2026-09-15 23:59:59+05:30'
);

-- -- Opportunity created by Teacher

INSERT INTO placement_opportunity (
    id,
    alumni_id,
    teacher_id,
    college_company_id,
    role,
    status,
    eligibility,
    deadline
)
VALUES
(
    '80000000-0000-0000-0000-000000000002',
    NULL,
    '40000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000002',
    'Software Engineer',
    'OPEN',
    'CGPA >= 8.0, CSE students, Batch 2027',
    '2026-09-20 23:59:59+05:30'
);


-- ============================================================
-- 10. COMPANY REQUEST
-- ============================================================

INSERT INTO company_request (
    id,
    college_company_id,
    interview_requested_at,
    number_of_positions,
    number_of_rounds,
    timings,
    breakfast,
    lunch,
    dinner,
    status,
    number_of_people_attending,
    contact_phone,
    announcement_for_students
)
VALUES
(
    '90000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000001',
    '2026-09-01 10:00:00+05:30',
    20,
    4,
    '10:00 AM - 5:00 PM',
    TRUE,
    TRUE,
    FALSE,
    'PENDING',
    8,
    '+91-9000000000',
    'Microsoft placement drive for eligible CSE students.'
),
(
    '90000000-0000-0000-0000-000000000002',
    '60000000-0000-0000-0000-000000000002',
    '2026-09-10 09:30:00+05:30',
    15,
    5,
    '09:30 AM - 6:00 PM',
    TRUE,
    TRUE,
    TRUE,
    'APPROVED',
    10,
    '+91-9111111111',
    'Google recruitment drive for 2027 batch.'
);

