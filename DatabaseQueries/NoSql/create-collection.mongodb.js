
// mongosh "YOUR_MONGODB_CONNECTION_STRING" .\mongodb\01-create-collections.js
use("placement_db");
db.feedback_on_company_interview.drop();
db.createCollection("feedback_on_company_interview", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "collegeCompanyId",
                "alumniId",
                "info",
                "status"
            ],
            properties: {
                collegeCompanyId: {
                    bsonType: "string",
                    description: "PostgreSQL college_company UUID"
                },

                alumniId: {
                    bsonType: "string",
                    description: "PostgreSQL alumni UUID"
                },

                info: {
                    bsonType: "array",
                    minItems: 1,
                    description: "One entry per interview round; any number of rounds",
                    items: {
                        bsonType: "object",
                        required: ["heading", "questions"],
                        properties: {
                            heading: {
                                bsonType: "string",
                                description: "e.g. Coding round, HR round"
                            },
                            questions: {
                                bsonType: "array",
                                items: { bsonType: "string" },
                                description: "Any number of questions in this round"
                            }
                        }
                    }
                },

                status: {
                    bsonType: "string",
                    enum: [
                        "PENDING",
                        "IN_PROGRESS",
                        "COMPLETED"
                    ]
                }
            }
        }
    }
});


db.feedback_on_company_interview.insertOne({
    collegeCompanyId: "60000000-0000-0000-0000-000000000001",
    alumniId: "30000000-0000-0000-0000-000000000001",
    info: [
        {
            heading: "Coding round",
            questions: [
                "Explain the difference between an array and a linked list.",
                "What is the time complexity of binary search?",
                "Explain the concept of hashing.",
                "What is the difference between stack and queue?",
                "Solve a problem involving two pointers."
            ]
        },
        {
            heading: "Technical round",
            questions: [
                "Explain the SOLID principles.",
                "What is normalization in databases?",
                "Explain ACID properties.",
                "What happens when you enter a URL in a browser?",
                "Design a URL shortening service."
            ]
        }
    ],
    status: "PENDING"
});