-- 1. Insert Company
INSERT INTO company (company_id, company_name, industry)
VALUES ('comp123', 'Tech Corp', 'Technology');

-- 2. Insert Alumni (depends on Company)
INSERT INTO alumni (alumniid, position, linkdinprofile, companyid)
VALUES ('alum123', 'Senior Software Engineer', 'https://linkedin.com/in/johndoe', 'comp123');

-- 3. Now you can insert your FeedbackOnCompany with the JSON you provided!