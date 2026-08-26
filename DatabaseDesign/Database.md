# College Placement Management Database

## Overview

This database manages colleges, students, teachers, alumni,
companies, placement opportunities, placements and company
interview requests.

## Entities

### College

Represents an educational institution.

Fields:

- id
- name
- address
- contact
- verified_status
- created_at
- updated_at

### Student

Represents a student belonging to a college.

Fields:

- id
- college_id
- name
- email
- roll_no
- batch
- department
- created_at
- updated_at

Relationship:

College 1 ---- N Students

### Alumni

Represents an alumnus belonging to a college.

Fields:

- id
- college_id
- name
- email
- designation
- company_id
- passing_year
- created_at
- updated_at

Relationship:

College 1 ---- N Alumni

Company 1 ---- N Alumni

### Company

Represents a company participating in placements.

Fields:

- id
- name
- industry
- created_at
- updated_at

### College Company

Represents a relationship between a college and a company.

Fields:

- id
- college_id
- company_id
- company_key
- created_at
- updated_at

Relationship:

College N ---- N Company

through College_Company

### Teacher

Represents a teacher/faculty member.

Fields:

- id
- college_id
- name
- email
- department
- joining_year
- created_at
- updated_at

### TPO

Represents the Training and Placement Officer.

Fields:

- id
- college_id
- name
- email
- created_at
- updated_at

### Placement

Represents a student successfully placed in a company.

Fields:

- id
- student_id
- college_company_id
- package
- role
- placement_date
- created_at
- updated_at

Relationship:

Student 1 ---- N Placements

College_Company 1 ---- N Placements

### Placement Opportunity

Represents an opportunity made available to students.

An opportunity can be created by either:

- Alumni
- Teacher

Fields:

- id
- alumni_id
- teacher_id
- college_company_id
- role
- status
- eligibility
- deadline
- created_at
- updated_at

Constraint:

Exactly one of alumni_id or teacher_id must be populated.

### Company Request

Represents a request from a company to conduct an interview/placement
process through a college.

Fields:

- id
- college_company_id
- requested_at
- number_of_positions
- number_of_rounds
- timing
- breakfast
- lunch
- dinner
- status
- number_of_people_attending
- contact_info
- announcement_for_students
- created_at
- updated_at