
// mongosh "YOUR_MONGODB_CONNECTION_STRING" .\mongodb\01-create-collections.js
use("placement_db");

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
                    bsonType: "object",
                    required: [
                        "round1",
                        "round2"
                    ],
                    properties: {
                        round1: {
                            bsonType: "array",
                            items: {
                                bsonType: "string"
                            }
                        },

                        round2: {
                            bsonType: "array",
                            items: {
                                bsonType: "string"
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

    info: {
        round1: [
            "Explain the difference between an array and a linked list.",
            "What is the time complexity of binary search?",
            "Explain the concept of hashing.",
            "What is the difference between stack and queue?",
            "Solve a problem involving two pointers."
        ],

        round2: [
            "Explain the SOLID principles.",
            "What is normalization in databases?",
            "Explain ACID properties.",
            "What happens when you enter a URL in a browser?",
            "Design a URL shortening service."
        ]
    },

    status: "PENDING"
});