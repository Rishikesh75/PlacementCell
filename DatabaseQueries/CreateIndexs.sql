CREATE INDEX idx_student_college_id
ON student(college_id);

CREATE INDEX idx_student_batch
ON student(batch);

CREATE INDEX idx_alumni_college_id
ON alumni(college_id);

CREATE INDEX idx_teacher_college_id
ON teacher(college_id);

CREATE INDEX idx_placement_student_id
ON placement(student_id);

CREATE INDEX idx_placement_company_id
ON placement(college_company_id);

CREATE INDEX idx_opportunity_company_id
ON placement_opportunity(college_company_id);

CREATE INDEX idx_opportunity_status
ON placement_opportunity(status);

CREATE INDEX idx_company_request_company_id
ON company_request(college_company_id);

CREATE INDEX idx_company_request_status
ON company_request(status);


CREATE UNIQUE INDEX uq_user_student ON user_account(student_id) WHERE student_id IS NOT NULL;
CREATE UNIQUE INDEX uq_user_teacher ON user_account(teacher_id) WHERE teacher_id IS NOT NULL;
CREATE UNIQUE INDEX uq_user_alumni ON user_account(alumni_id) WHERE alumni_id IS NOT NULL;
CREATE UNIQUE INDEX uq_user_tpo ON user_account(tpo_id) WHERE tpo_id IS NOT NULL;
CREATE UNIQUE INDEX uq_user_college_company ON user_account(college_company_id) WHERE college_company_id IS NOT NULL;