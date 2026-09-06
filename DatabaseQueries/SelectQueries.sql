-- select * from student;

-- select * from company_request;

-- select * from college;

-- ALTER TABLE college
-- ADD COLUMN image_file_name VARCHAR(500);



UPDATE college
SET
    image_file_name = CASE id
        WHEN '11111111-1111-1111-1111-111111111111'
            THEN 'IIITDM Image.png'
        WHEN '22222222-2222-2222-2222-222222222222'
            THEN 'IIT Madaras.jpg'
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
);

select * from college;