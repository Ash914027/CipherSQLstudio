const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
require('dotenv').config();

const sampleAssignments = [
  {
    title: "Basic SELECT Query",
    difficulty: "Easy",
    description: "Learn to retrieve data from a single table using SELECT statements",
    question: "Write a query to select all columns from the 'employees' table where the salary is greater than 50000.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" },
          { name: "hire_date", type: "DATE" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000, hire_date: "2020-01-15" },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000, hire_date: "2021-03-20" },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000, hire_date: "2019-07-10" },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000, hire_date: "2022-02-01" }
        ]
      }
    ],
    expectedColumns: ["id", "name", "department", "salary", "hire_date"]
  },
  {
    title: "JOIN Operations",
    difficulty: "Medium",
    description: "Practice combining data from multiple tables using JOIN clauses",
    question: "Write a query to display employee names along with their department names by joining the employees and departments tables.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "dept_id", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", dept_id: 1 },
          { id: 2, name: "Jane Smith", dept_id: 2 },
          { id: 3, name: "Bob Johnson", dept_id: 1 }
        ]
      },
      {
        name: "departments",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "dept_name", type: "VARCHAR(50)" }
        ],
        sampleData: [
          { id: 1, dept_name: "Engineering" },
          { id: 2, dept_name: "Marketing" },
          { id: 3, dept_name: "HR" }
        ]
      }
    ],
    expectedColumns: ["name", "dept_name"]
  },
  {
    title: "Aggregate Functions",
    difficulty: "Medium",
    description: "Master GROUP BY and aggregate functions like COUNT, SUM, AVG",
    question: "Write a query to find the average salary for each department, showing department name and average salary.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000 },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000 },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000 },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000 },
          { id: 5, name: "Charlie Brown", department: "Marketing", salary: 48000 }
        ]
      }
    ],
    expectedColumns: ["department", "avg_salary"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cipher_sql_studio');
    console.log('✅ Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('🗑️  Cleared existing assignments');

    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log('✅ Seeded sample assignments');

    console.log(`📊 Total assignments: ${sampleAssignments.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();