-- -- =======================
-- -- DROP TABLES (Correct Order)
-- -- =======================
-- DROP TABLE IF EXISTS Food CASCADE;
-- DROP TABLE IF EXISTS FeedBackOnCompany CASCADE;
-- DROP TABLE IF EXISTS ExperienceOpening CASCADE;
-- DROP TABLE IF EXISTS EmployeeonStudent CASCADE;
-- DROP TABLE IF EXISTS CompanyEmployee CASCADE;
-- DROP TABLE IF EXISTS Alumni CASCADE;
-- DROP TABLE IF EXISTS TeacherPlacements CASCADE;
-- DROP TABLE IF EXISTS Teacher CASCADE;
-- DROP TABLE IF EXISTS Student CASCADE;
-- DROP TABLE IF EXISTS Restaurents CASCADE;
-- DROP TABLE IF EXISTS Company CASCADE;

-- -- =======================
-- -- CREATE TABLES (Correct Order)
-- -- =======================

-- -- 1. Company (Parent)
-- CREATE TABLE Company (
--     company_id TEXT PRIMARY KEY,
--     company_name TEXT NOT NULL,
--     industry TEXT NOT NULL
-- );

-- -- 2. Alumni (Depends on Company)
-- CREATE TABLE Alumni (
--     AlumniId TEXT PRIMARY KEY,
--     Position TEXT,
--     LinkdinProfile TEXT,
--     CompanyId TEXT NOT NULL,

--     CONSTRAINT fk_company
--         FOREIGN KEY (CompanyId)
--         REFERENCES Company(company_id)
--         ON DELETE SET NULL
-- );

-- -- 3. CompanyEmployee (Depends on Company)
-- CREATE TABLE CompanyEmployee (
--     EmployeeId TEXT PRIMARY KEY,
--     Name TEXT,
--     Designation TEXT,
--     Email TEXT,
--     CompanyId TEXT NOT NULL,

--     CONSTRAINT fk_company
--         FOREIGN KEY (CompanyId)
--         REFERENCES Company(company_id)
--         ON DELETE CASCADE
-- );

-- -- 4. EmployeeonStudent (Depends on CompanyEmployee)
-- CREATE TABLE EmployeeonStudent (
--     RecordId SERIAL PRIMARY KEY,
--     CompnayEmpId TEXT NOT NULL,
--     BatchId TEXT,
--     Description TEXT,

--     CONSTRAINT fk_company_employee
--         FOREIGN KEY (CompnayEmpId)
--         REFERENCES CompanyEmployee(EmployeeId)
--         ON DELETE CASCADE
-- );

-- -- 5. ExperienceOpening (Depends on Company)
-- CREATE TABLE ExperienceOpening (
--     Id SERIAL PRIMARY KEY,
--     CompanyId TEXT NOT NULL,
--     JobID TEXT NOT NULL,
--     JobTitle TEXT,
--     ExperienceRequired TEXT,
--     CompanyEmpEmail TEXT,

--     CONSTRAINT fk_company
--         FOREIGN KEY (CompanyId)
--         REFERENCES Company(company_id)
--         ON DELETE CASCADE
-- );

-- -- 6. Restaurents (Independent)
-- CREATE TABLE Restaurents (
--     RestaurentId SERIAL PRIMARY KEY,
--     Name TEXT NOT NULL,
--     contact TEXT,
--     address TEXT,
--     Rating TEXT
-- );

-- -- 7. Food (Depends on Restaurents & Company)
-- CREATE TABLE Food (
--     Id SERIAL PRIMARY KEY,
--     restaurentId INT NOT NULL,
--     companyID TEXT NOT NULL,
--     Description TEXT,
--     Date DATE DEFAULT CURRENT_DATE,

--     CONSTRAINT fk_restaurent
--         FOREIGN KEY (restaurentId)
--         REFERENCES Restaurents(RestaurentId)
--         ON DELETE CASCADE,

--     CONSTRAINT fk_company
--         FOREIGN KEY (companyID)
--         REFERENCES Company(company_id)
--         ON DELETE CASCADE
-- );

-- -- 8. FeedBackOnCompany (Depends on Company, Alumni)
-- CREATE TABLE FeedBackOnCompany (
--     FeedbackId TEXT PRIMARY KEY,
--     CompanyId TEXT NOT NULL,
--     AlumniID TEXT NOT NULL,
--     Description TEXT,

--     CONSTRAINT fk_company
--         FOREIGN KEY (CompanyId)
--         REFERENCES Company(company_id)
--         ON DELETE CASCADE,

--     CONSTRAINT fk_alumni
--         FOREIGN KEY (AlumniID)
--         REFERENCES Alumni(AlumniId)
--         ON DELETE CASCADE
-- );

-- -- 9. Student (Independent)
-- CREATE TABLE Student (
--     StudentId VARCHAR PRIMARY KEY,
--     name VARCHAR,
--     Major VARCHAR,
--     Email VARCHAR,
--     GraduationYear BIGINT,
--     PhoneNO VARCHAR
-- );

-- -- 10. Teacher (Independent)
-- CREATE TABLE Teacher (
--     Teacher_Id Text PRIMARY KEY,
--     Name VARCHAR,
--     Email VARCHAR,
--     Department BIGINT
-- );

-- -- 11. TeacherPlacements (Depends on Teacher & Company)
-- CREATE TABLE TeacherPlacements (
--     Id SERIAL PRIMARY KEY,
--     TeacherId TEXT NOT NULL,
--     CompanyId TEXT NOT NULL,
--     EmployeeEmail TEXT,

--     CONSTRAINT fk_teacher
--         FOREIGN KEY (TeacherId)
--         REFERENCES Teacher(Teacher_Id)
--         ON DELETE SET NULL,

--     CONSTRAINT fk_company
--         FOREIGN KEY (CompanyId)
--         REFERENCES Company(company_id)
--         ON DELETE CASCADE
-- );

-- -- -- =======================
-- -- -- VIEW EXISTING TABLES
-- -- -- =======================
-- -- SELECT table_name 
-- -- FROM information_schema.tables 
-- -- WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
-- -- =======================
-- -- INSERT SAMPLE DATA
-- -- =======================

-- INSERT INTO Company (company_id, company_name, industry) VALUES
-- ('C001', 'TechNova', 'Software'),
-- ('C002', 'GreenFoods', 'AgriTech'),
-- ('C003', 'FinMate', 'Fintech');

-- INSERT INTO Alumni (AlumniId, Position, LinkdinProfile, CompanyId) VALUES
-- ('A001', 'Software Engineer', 'https://linkedin.com/in/a001', 'C001'),
-- ('A002', 'Data Scientist', 'https://linkedin.com/in/a002', 'C003')

-- INSERT INTO CompanyEmployee (EmployeeId, Name, Designation, Email, CompanyId) VALUES
-- ('E001', 'Alice Johnson', 'HR Manager', 'alice@technova.com', 'C001'),
-- ('E002', 'Bob Smith', 'Tech Lead', 'bob@finmate.com', 'C003');

-- INSERT INTO EmployeeonStudent (CompnayEmpId, BatchId, Description) VALUES
-- ('E001', 'B2022', 'Mentored students on career paths'),
-- ('E002', 'B2023', 'Conducted resume review sessions');

-- INSERT INTO ExperienceOpening (CompanyId, JobID, JobTitle, ExperienceRequired, CompanyEmpEmail) VALUES
-- ('C001', 'J001', 'Backend Developer', '2+ years', 'alice@technova.com'),
-- ('C003', 'J002', 'ML Engineer', '1+ year', 'bob@finmate.com');

-- INSERT INTO Restaurents (Name, contact, address, Rating) VALUES
-- ('Spice Delight', '9876543210', '123 Food Lane', '4.5'),
-- ('Green Bites', '9123456780', '456 Vegan St', '4.2');

-- INSERT INTO Food (restaurentId, companyID, Description) VALUES
-- (1, 'C001', 'Lunch for company event'),
-- (2, 'C002', 'Healthy snacks partnership');

-- INSERT INTO FeedBackOnCompany (FeedbackId, CompanyId, AlumniID, Description) VALUES
-- ('F001', 'C001', 'A001', 'Great company culture'),
-- ('F002', 'C003', 'A002', 'Good opportunities for growth');

-- INSERT INTO Student (StudentId, name, Major, Email, GraduationYear, PhoneNO) VALUES
-- ('Cs21b1075', 'Rahul Mehta', 'Computer Science', 'rahul@example.com', 2022, '9876543210'),
-- ('CS21B1043', 'Priya Singh', 'Information Technology', 'priya@example.com', 2023, '8765432109');

-- INSERT INTO Teacher (Teacher_Id, Name, Email, Department) VALUES
-- ('CS21001', 'Dr. Neha Sharma', 'neha.sharma@univ.edu', 101),
-- ('CS21002', 'Prof. Arjun Rao', 'arjun.rao@univ.edu', 102);

-- INSERT INTO TeacherPlacements (TeacherId, CompanyId, EmployeeEmail) VALUES
-- ('CS21001', 'C001', 'alice@technova.com'),
-- ('CS21002', 'C003', 'bob@finmate.com');
select * from Alumni;