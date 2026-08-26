-- ============================================================
-- RESET (MVP) — drop everything this file creates, then recreate
-- ============================================================

DROP TABLE IF EXISTS
    user_account,
    company_request,
    placement_opportunity,
    placement,
    college_company,
    student,
    alumni,
    teacher,
    tpo,
    college,
    company CASCADE;


-- ============================================================
-- COLLEGE PLACEMENT MANAGEMENT DATABASE
-- PostgreSQL
-- ============================================================

-- ============================================================
-- 1. COLLEGE
-- ============================================================

CREATE TABLE college (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    address TEXT,

    contact VARCHAR(50),

    verified_status BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_college_name UNIQUE (name)
);


-- ============================================================
-- 2. COMPANY
-- ============================================================

CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    industry VARCHAR(150),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_company_name UNIQUE (name)
);


-- ============================================================
-- 3. STUDENT
-- ============================================================

CREATE TABLE student (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    roll_no VARCHAR(100) NOT NULL,

    batch VARCHAR(20) NOT NULL,

    department VARCHAR(150),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_college
        FOREIGN KEY (college_id)
        REFERENCES college(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_student_email UNIQUE (email),

    CONSTRAINT uq_student_roll_no
        UNIQUE (college_id, roll_no)
);


-- ============================================================
-- 4. ALUMNI
-- ============================================================

CREATE TABLE alumni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255),

    company_id UUID,

    designation VARCHAR(150),

    passing_year INTEGER NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alumni_college
        FOREIGN KEY (college_id)
        REFERENCES college(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_alumni_company
        FOREIGN KEY (company_id)
        REFERENCES company(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_alumni_passing_year
        CHECK (passing_year >= 1900),

    CONSTRAINT uq_alumni_email
        UNIQUE (email)
);


-- ============================================================
-- 5. TEACHER
-- ============================================================

CREATE TABLE teacher (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    department VARCHAR(150),

    joining_year INTEGER,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_teacher_college
        FOREIGN KEY (college_id)
        REFERENCES college(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_teacher_email
        UNIQUE (email)
);


-- ============================================================
-- 6. TPO
-- ============================================================

CREATE TABLE tpo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tpo_college
        FOREIGN KEY (college_id)
        REFERENCES college(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_tpo_email
        UNIQUE (email)
);


-- ============================================================
-- 7. COLLEGE COMPANY
-- ============================================================

CREATE TABLE college_company (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_id UUID NOT NULL,

    company_id UUID NOT NULL,

    company_key VARCHAR(100) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_college_company_college
        FOREIGN KEY (college_id)
        REFERENCES college(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_college_company_company
        FOREIGN KEY (company_id)
        REFERENCES company(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_college_company
        UNIQUE (college_id, company_id),

    CONSTRAINT uq_college_company_key
        UNIQUE (college_id, company_key)
);


-- ============================================================
-- 8. PLACEMENT
-- ============================================================

CREATE TABLE placement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL,

    college_company_id UUID NOT NULL,

    package NUMERIC(12,2) NOT NULL,

    role VARCHAR(150) NOT NULL,

    placement_date DATE NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_placement_student
        FOREIGN KEY (student_id)
        REFERENCES student(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_placement_college_company
        FOREIGN KEY (college_company_id)
        REFERENCES college_company(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_placement_package
        CHECK (package >= 0)
);


-- ============================================================
-- 9. PLACEMENT OPPORTUNITY
-- ============================================================

CREATE TABLE placement_opportunity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alumni_id UUID,

    teacher_id UUID,

    college_company_id UUID NOT NULL,

    role VARCHAR(150) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',

    eligibility TEXT,

    deadline TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_opportunity_alumni
        FOREIGN KEY (alumni_id)
        REFERENCES alumni(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_opportunity_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teacher(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_opportunity_company
        FOREIGN KEY (college_company_id)
        REFERENCES college_company(id)
        ON DELETE CASCADE,

    -- Exactly one creator must exist
    CONSTRAINT chk_opportunity_creator
        CHECK (
            (alumni_id IS NOT NULL AND teacher_id IS NULL)
            OR
            (alumni_id IS NULL AND teacher_id IS NOT NULL)
        ),

    CONSTRAINT chk_opportunity_status
        CHECK (
            status IN (
                'OPEN',
                'CLOSED',
                'CANCELLED',
                'FILLED'
            )
        )
);


-- ============================================================
-- 10. COMPANY REQUEST
-- ============================================================

CREATE TABLE company_request (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    college_company_id UUID NOT NULL,

    interview_requested_at TIMESTAMPTZ NOT NULL,

    number_of_positions INTEGER NOT NULL,

    number_of_rounds INTEGER NOT NULL,

    timings TEXT,

    breakfast BOOLEAN NOT NULL DEFAULT FALSE,

    lunch BOOLEAN NOT NULL DEFAULT FALSE,

    dinner BOOLEAN NOT NULL DEFAULT FALSE,

    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',

    number_of_people_attending INTEGER,

    contact_name VARCHAR(255),

    contact_email VARCHAR(255),

    contact_phone VARCHAR(50),

    announcement_for_students TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_company_request_company
        FOREIGN KEY (college_company_id)
        REFERENCES college_company(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_company_request_positions
        CHECK (number_of_positions > 0),

    CONSTRAINT chk_company_request_rounds
        CHECK (number_of_rounds > 0),

    CONSTRAINT chk_company_request_attendees
        CHECK (
            number_of_people_attending IS NULL
            OR number_of_people_attending >= 0
        ),

    CONSTRAINT chk_company_request_status
        CHECK (
            status IN (
                'PENDING',
                'APPROVED',
                'REJECTED',
                'CANCELLED',
                'COMPLETED'
            )
        )
);




CREATE TABLE user_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,

    student_id UUID,
    teacher_id UUID,
    alumni_id UUID,
    tpo_id UUID,
    college_company_id UUID,

    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_user_account_email UNIQUE (email),

    CONSTRAINT fk_user_student
        FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_teacher
        FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_alumni
        FOREIGN KEY (alumni_id) REFERENCES alumni(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_tpo
        FOREIGN KEY (tpo_id) REFERENCES tpo(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_college_company
        FOREIGN KEY (college_company_id) REFERENCES college_company(id) ON DELETE CASCADE,

    CONSTRAINT chk_user_role
        CHECK (role IN ('STUDENT', 'TEACHER', 'ALUMNI', 'TPO', 'COMPANY')),

    CONSTRAINT chk_user_profile
        CHECK (
            (role = 'STUDENT' AND student_id IS NOT NULL
                AND teacher_id IS NULL AND alumni_id IS NULL
                AND tpo_id IS NULL AND college_company_id IS NULL)
            OR
            (role = 'TEACHER' AND teacher_id IS NOT NULL
                AND student_id IS NULL AND alumni_id IS NULL
                AND tpo_id IS NULL AND college_company_id IS NULL)
            OR
            (role = 'ALUMNI' AND alumni_id IS NOT NULL
                AND student_id IS NULL AND teacher_id IS NULL
                AND tpo_id IS NULL AND college_company_id IS NULL)
            OR
            (role = 'TPO' AND tpo_id IS NOT NULL
                AND student_id IS NULL AND teacher_id IS NULL
                AND alumni_id IS NULL AND college_company_id IS NULL)
            OR
            (role = 'COMPANY' AND college_company_id IS NOT NULL
                AND student_id IS NULL AND teacher_id IS NULL
                AND alumni_id IS NULL AND tpo_id IS NULL)
        )
);

