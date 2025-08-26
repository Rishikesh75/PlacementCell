
export interface feedbackcarddata{
    companydetails: CompanyDetails;
    codingroundinfo: CodingRoundInfo;
    TechnicalRound: TechnicalRound;
    HRRound: HRRound;
    Resources: Resources[];
}

export interface CompanyDetails
{
    companyName: string;
    jobProfile: string;
    numRounds: number;
    jobType: string;
    ctc: number | string;
    workMode: string;
    location: string;
}
export interface CodingRoundInfo
{
    codingPlatform: string;
    codingDuration: string;
    codingQuestions: Question[];
    codingDifficulty: string;
    interviewMode: string;
}
export interface TechnicalRound
{
    Interviewmode: string;
    Duration: string;
    DSAQuestion: DSAQuestion[];
    ComputerCoreQuestion: ComputerCoreQuestion[];
    SystemDesignQuestion: SystemDesignQuestion[];
    PuzzleBasedQuestion: PuzzleBasedQuestion[];
}
export interface HRRound
{
    SituationBasedQuestions: SituationBasedQuestions[];
    UnexpectedQuestions: UnexpectedQuestions[];
}

export interface Question{
    question: string;
}
/*Technical Interview Questions  */

export interface BaseQuestion extends Question { 
    difficulty: string;
}
export interface PuzzleBasedQuestion extends BaseQuestion{}
export interface DSAQuestion extends BaseQuestion {
    questionType: string;
}
export interface ComputerCoreQuestion extends BaseQuestion {
    questionType: string;
}
export interface SystemDesignQuestion extends BaseQuestion{
    questionType:string;
}

/*HR Round Questions */
export interface SituationBasedQuestions extends Question{}
export interface UnexpectedQuestions extends Question{}

/*Resource Section */
export interface Resources
{
    category?: string;
    Description?: string;
    Link?: string;
}



export const FeedbackcardSample: feedbackcarddata[] = [
  {
    companydetails: {
      companyName: "TechCorp",
      jobProfile: "Software Engineer",
      numRounds: 3,
      jobType: "Full Time",
      ctc: "12 LPA",
      workMode: "Hybrid",
      location: "Bangalore"
    },
    codingroundinfo: {
      codingPlatform: "HackerRank",
      codingDuration: "60 mins",
      codingQuestions: [
        { question: "Find the longest palindrome in a string" },
        { question: "Implement a queue using stacks" }
      ],
      codingDifficulty: "Medium",
      interviewMode: "Online"
    },
    TechnicalRound: {
      Interviewmode: "Offline",
      Duration: "45 mins",
      DSAQuestion: [
        { question: "Reverse a linked list", difficulty: "Easy", questionType: "Linked List" }
      ],
      ComputerCoreQuestion: [
        { question: "Explain OS process scheduling", difficulty: "Medium", questionType: "Operating System" }
      ],
      SystemDesignQuestion: [
        { question: "Design a URL shortener", difficulty: "Hard", questionType: "System Design" }
      ],
      PuzzleBasedQuestion: [
        { question: "3 light bulbs and 3 switches puzzle", difficulty: "Medium" }
      ]
    },
    HRRound: {
      SituationBasedQuestions: [
        { question: "Describe a time you handled conflict" }
      ],
      UnexpectedQuestions: [
        { question: "If you were an animal, which one would you be?" }
      ]
    },
    Resources: [{
      category: "DSA",
      Description: "LeetCode for DSA",
      Link: "https://leetcode.com"
    }]
  },
  {
    companydetails: {
      companyName: "InnoSoft",
      jobProfile: "Backend Developer",
      numRounds: 2,
      jobType: "Internship",
      ctc: "6 LPA",
      workMode: "Remote",
      location: "Pune"
    },
    codingroundinfo: {
      codingPlatform: "CodeSignal",
      codingDuration: "45 mins",
      codingQuestions: [
        { question: "Find the missing number in an array" }
      ],
      codingDifficulty: "Easy",
      interviewMode: "Online"
    },
    TechnicalRound: {
      Interviewmode: "Online",
      Duration: "30 mins",
      DSAQuestion: [
        { question: "Detect a cycle in a graph", difficulty: "Medium", questionType: "Graph" }
      ],
      ComputerCoreQuestion: [],
      SystemDesignQuestion: [],
      PuzzleBasedQuestion: []
    },
    HRRound: {
      SituationBasedQuestions: [
        { question: "How do you prioritize tasks?" }
      ],
      UnexpectedQuestions: []
    },
    Resources: [{
      category: "Aptitude",
      Description: "IndiaBix Aptitude",
      Link: "https://www.indiabix.com/aptitude/questions-and-answers/"
    }]
  },
  {
    companydetails: {
      companyName: "DataWorks",
      jobProfile: "Data Analyst",
      numRounds: 4,
      jobType: "Full Time",
      ctc: "10 LPA",
      workMode: "Onsite",
      location: "Delhi"
    },
    codingroundinfo: {
      codingPlatform: "Codility",
      codingDuration: "90 mins",
      codingQuestions: [
        { question: "SQL query to find duplicate records" }
      ],
      codingDifficulty: "Medium",
      interviewMode: "Offline"
    },
    TechnicalRound: {
      Interviewmode: "Offline",
      Duration: "60 mins",
      DSAQuestion: [],
      ComputerCoreQuestion: [
        { question: "Explain normalization in DBMS", difficulty: "Easy", questionType: "DBMS" }
      ],
      SystemDesignQuestion: [],
      PuzzleBasedQuestion: []
    },
    HRRound: {
      SituationBasedQuestions: [],
      UnexpectedQuestions: [
        { question: "What would you do if you won the lottery?" }
      ]
    },
    Resources: [{
      category: "SQL",
      Description: "SQLZoo",
      Link: "https://sqlzoo.net"
    }, {
      category: "DBMS",
      Description: "DBMS Notes",
      Link: "https://www.geeksforgeeks.org/dbms/"
    }]
  }
];

export const Companies : string[] = [
  "Google", "Microsoft", "Amazon", "Apple", "Meta",
  "Netflix", "Tesla", "Adobe", "IBM", "Oracle",
  "Intel", "Salesforce", "Cisco", "Twitter", "Zoom"
];

export const Locations: string[] = [
  "Bengaluru", "Hyderabad", "Pune", "Chennai", "Delhi",
  "Mumbai", "Gurugram", "Noida", "Kolkata", "Ahmedabad",
  "Jaipur", "Chandigarh", "Coimbatore", "Nagpur", "Indore"
];


export const DSAQuestionType: string[] = [
  "Array", "String", "LinkedList", "Tree", "Graph",
  "DynamicProgramming", "Backtracking", "Greedy", "Sorting", "Searching"
];

export const CoreCSquestionType: string[] = [
  "Computer Networks", "Operating Systems", "Database Management Systems", "Software Engineering", "Web Development"
];

export const ResourceCategory: string[] = [
  "DSA", "Core CS", "DBMS", "System Design", "Puzzle Based"
];

