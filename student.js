import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDsphs9Uhgwxr5ygWO-_tGu24uWQeB7u4Y",
  authDomain: "sql-quiz-9b114.firebaseapp.com",
  projectId: "sql-quiz-9b114",
  storageBucket: "sql-quiz-9b114.appspot.com",
  messagingSenderId: "631979981590",
  appId: "1:631979981590:web:f1ca8377cf3b70fd07ee37",
  measurementId: "G-FX4X08H4QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const questions = [
    {
      question: "What does the SELECT statement do in SQL?",
      options: ["Deletes data", "Adds new records", "Displays data from a table", "Changes table structure"],
      answer: 2
    },
    {
      question: "Which SQL statement selects all columns from the students table?",
      options: ["SELECT * FROM students;", "GET * FROM students;", "SELECT ALL students;", "FETCH ALL FROM students;"],
      answer: 0
    },
    {
      question: "How do you select only the name column from employees?",
      options: ["SELECT name FROM employees;", "GET name FROM employees;", "DISPLAY name FROM employees;", "SELECT * FROM employees;"],
      answer: 0
    },
    {
      question: "What is the result of SELECT 1+1;?",
      options: ["11", "2", "1", "Error"],
      answer: 1
    },
    {
      question: "What does SELECT * from tablename; do?",
      options: ["Selects all databases", "Selects all tables", "Selects all columns", "Deletes all columns"],
      answer: 2
    },
    {
      question: "Write a query to select city, state from locations.",
      options: ["SELECT FROM locations city, state;", "SELECT city, state FROM locations;", "DISPLAY city state FROM locations;", "SELECT locations FROM city, state;"],
      answer: 1
    },
    {
      question: "What does SELECT name AS Student FROM students; do?",
      options: ["Changes column permanently", "Renames the column output", "Filters by student", "Deletes the column"],
      answer: 1
    },
    {
      question: "What is the use of DISTINCT in SQL?",
      options: ["It orders the rows", "It removes duplicate rows", "It shows column names", "It adds new rows"],
      answer: 1
    },
    {
      question: "Which query returns unique department values?",
      options: ["SELECT ALL department FROM employees;", "SELECT UNIQUE department FROM employees;", "SELECT department FROM employees;", "SELECT DISTINCT department FROM employees;"],
      answer: 3
    },
    {
      question: "Can DISTINCT be used on multiple columns?",
      options: ["No", "Yes", "Only one column", "Only on numbers"],
      answer: 1
    },
    {
      question: "What does SELECT DISTINCT city, country FROM addresses; return?",
      options: ["Only distinct cities", "Only distinct countries", "Unique city-country pairs", "Sorted values"],
      answer: 2
    },
    {
      question: "What does SELECT DISTINCT email FROM users; do?",
      options: ["Deletes duplicate emails", "Selects all emails", "Returns only unique emails", "Groups emails"],
      answer: 2
    },
    {
      question: "What does DISTINCT remove?",
      options: ["Duplicate columns", "Duplicate values", "Tables", "Primary keys"],
      answer: 1
    },
    {
      question: "What will SELECT DISTINCT name FROM students; return?",
      options: ["All students", "Student names", "Only unique student names", "Sorted names"],
      answer: 2
    },
    {
      question: "Which of the following returns distinct emails from customers?",
      options: ["SELECT emails FROM customers;", "SELECT DISTINCT email FROM customers;", "GET email FROM customers;", "SELECT UNIQUE email FROM customers;"],
      answer: 1
    },
    {
      question: "What does ORDER BY do in SQL?",
      options: ["Deletes rows", "Sorts the result", "Filters rows", "Renames table"],
      answer: 1
    },
    {
      question: "Which SQL sorts students by name?",
      options: ["SELECT name FROM students SORT BY name;", "SELECT name FROM students ORDER BY name;", "SORT name FROM students;", "SELECT name ORDER students;"],
      answer: 1
    },
    {
      question: "Which keyword orders in descending order?",
      options: ["ORDER", "REVERSE", "DESC", "DOWN"],
      answer: 2
    },
    {
      question: "Default sort order in SQL is:",
      options: ["Random", "Descending", "Ascending", "None"],
      answer: 2
    },
    {
      question: "Which is correct for descending sort of books by title?",
      options: ["SELECT title FROM books ORDER BY title DESC;", "SELECT DESC title FROM books;", "ORDER title FROM books DESC;", "SELECT title DESCENDING FROM books;"],
      answer: 0
    },
    {
      question: "Which query sorts movies by release year, then by title?",
      options: ["ORDER movies BY year, title;", "SELECT * FROM movies ORDER BY release_year, title;", "SELECT movies BY title;", "SORT release_year AND title FROM movies;"],
      answer: 1
    },
    {
      question: "Which statement is true?",
      options: ["ORDER BY comes before WHERE", "ORDER BY sorts columns", "ORDER BY affects the output row order", "ORDER BY removes duplicates"],
      answer: 2
    },
    {
      question: "What is the purpose of WHERE in SQL?",
      options: ["To sort data", "To rename columns", "To filter rows", "To join tables"],
      answer: 2
    },
    {
      question: "Which query filters users where gender is 'Male'?",
      options: ["SELECT * FROM users GENDER = 'Male';", "SELECT * FROM users WHERE gender = 'Male';", "SELECT * WHERE gender IS 'Male';", "FILTER gender = 'Male';"],
      answer: 1
    },
    {
      question: "What does WHERE clause return?",
      options: ["All rows", "Only rows meeting condition", "Column names", "Ordered data"],
      answer: 1
    },
    {
      question: "Which query selects students where class is '10A'?",
      options: ["SELECT class FROM students = '10A';", "SELECT * FROM students WHERE class = '10A';", "SELECT FROM students WHERE '10A';", "GET students class = '10A';"],
      answer: 1
    },
    {
      question: "Can WHERE filter numeric values?",
      options: ["No", "Yes", "Only with AND", "Only if primary key"],
      answer: 1
    },
    {
      question: "Which query selects customers where city is 'Chennai'?",
      options: ["SELECT * FROM customers WHERE city = 'Chennai';", "SELECT * FROM customers IS city 'Chennai';", "SELECT WHERE city = Chennai;", "GET customers city Chennai;"],
      answer: 0
    },
    {
      question: "Which clause filters rows in SQL?",
      options: ["ORDER", "SELECT", "WHERE", "GROUP"],
      answer: 2
    },
    {
      question: "Get distinct city where department is 'Sales':",
      options: ["SELECT city FROM employees;", "SELECT DISTINCT city FROM employees WHERE department = 'Sales';", "FILTER department 'Sales';", "SELECT city FROM department;"],
      answer: 1
    },
    {
      question: "Select names ordered by roll number:",
      options: ["SELECT name FROM students ORDER BY roll_number;", "SELECT name BY roll_number;", "SELECT roll_number ORDER BY name;", "SORT name FROM students;"],
      answer: 0
    },

  {
    question: "Which of the following is a comparison operator in SQL?",
    options: ["AND", "LIKE", "=", "BETWEEN"],
    answer: 2
  },
  {
    question: "What does the != operator do in SQL?",
    options: ["Assigns a value", "Checks for equality", "Checks for inequality", "Performs addition"],
    answer: 2
  },
  {
    question: "Which of the following operators is used to check if a value lies within a range?",
    options: ["IN", "BETWEEN", "LIKE", "IS"],
    answer: 1
  },
  {
    question: "Which operator is used to combine multiple conditions in a WHERE clause where at least one must be true?",
    options: ["AND", "NOT", "ALL", "OR"],
    answer: 3
  },
  {
    question: "Which operator is used to check if a value matches any value in a list?",
    options: ["IN", "=", "IS", "BETWEEN"],
    answer: 0
  },
    {
      question: "Find product_name where category is 'Electronics':",
      options: ["SELECT product_name FROM products WHERE category = 'Electronics';", "GET products FROM Electronics;", "SELECT * WHERE category = Electronics;", "SELECT name WHERE category = 'Electronics';"],
      answer: 0
    },
    {
      question: "Unique emails sorted alphabetically:",
      options: ["SELECT email FROM users;", "SELECT DISTINCT email from users ORDER BY email;", "SELECT email ORDER BY name;", "SELECT * WHERE email IS NOT NULL;"],
      answer: 1
    },
    {
      question: "Courses from registrations in 'Fall':",
      options: ["SELECT course WHERE semester = 'Fall';", "SELECT course FROM registrations WHERE semester = 'Fall';", "GET registrations WHERE Fall;", "SELECT registrations FROM course;"],
      answer: 1
    },
    {
      question: "All orders sorted by date:",
      options: ["SELECT * from orders ORDER BY order_date;", "SELECT * SORT BY order_date;", "GET orders BY date;", "ORDER * BY order_date;"],
      answer: 0
    },
    {
      question: "Find users from India:",
      options: ["SELECT * FROM users WHERE country = 'India';", "FILTER country = 'India';", "SELECT users WHERE 'India';", "GET FROM users WHERE country;"],
      answer: 0
    },
    {
      question: "Distinct brands from products:",
      options: ["SELECT brand FROM products;", "SELECT DISTINCT brand FROM products;", "GET products brand;", "SELECT * WHERE brand;"],
      answer: 1
    },
    {
      question: "All students with grade A:",
      options: ["SELECT * FROM students WHERE grade = 'A';", "SELECT * WHERE grade = 'A';", "GET grade = 'A';", "SELECT grade A FROM students;"],
      answer: 0
    },
{
    question: "Which SQL clause is used to group rows that have the same values?",
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
    answer: 2
  },
  {
    question: "Which clause is used to filter groups created by GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
    answer: 1
  },
  {
    question: "Which query shows total salary per department?",
    options: [
      "SELECT department, SUM(salary) FROM employees;",
      "SELECT department, salary FROM employees GROUP BY department;",
      "SELECT department, SUM(salary) FROM employees GROUP BY department;",
      "SELECT SUM(salary) GROUP BY department FROM employees;"
    ],
    answer: 2
  },
  {
    question: "What will this query return? SELECT dept, COUNT(*) FROM staff GROUP BY dept HAVING COUNT(*) > 5;",
    options: [
      "All departments",
      "Departments with more than 5 employees",
      "Only 5 departments",
      "Error in query"
    ],
    answer: 1
  },
  {
    question: "Which clause comes first in SQL syntax?",
    options: ["GROUP BY", "HAVING", "WHERE", "ORDER BY"],
    answer: 2
  },
  {
    question: "What is a subquery in SQL?",
    options: [
      "A query that deletes data",
      "A query within another query",
      "A query that updates records",
      "A query without a WHERE clause"
    ],
    answer: 1
  },
  {
    question: "Which keyword is commonly used with subqueries?",
    options: ["JOIN", "UNION", "IN", "LIMIT"],
    answer: 2
  },
  {
    question: "Which query uses a subquery to find employees in the same department as 'John'?",
    options: [
      "SELECT * FROM employees WHERE department = 'John';",
      "SELECT * FROM employees WHERE department = (SELECT department FROM employees WHERE name = 'John');",
      "SELECT * FROM employees IN (SELECT name FROM employees);",
      "SELECT department FROM employees GROUP BY name;"
    ],
    answer: 1
  },
  {
    question: "Where can subqueries be placed in a SQL statement?",
    options: [
      "Only in SELECT clause",
      "Only in WHERE clause",
      "Only in FROM clause",
      "In SELECT, FROM, or WHERE clause"
    ],
    answer: 3
  },
  {
    question: "Which query finds the highest salary using a subquery?",
    options: [
      "SELECT MAX(salary) FROM employees;",
      "SELECT salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
      "SELECT salary FROM employees;",
      "SELECT * FROM employees GROUP BY salary;"
    ],
    answer: 1
  },
  {
    question: "Which data type is used to store date values in SQL?",
    options: ["DATE", "VARCHAR", "NUMBER", "TIME"],
    answer: 0
  },
  {
    question: "Which constraint ensures that a column cannot have NULL values?",
    options: ["UNIQUE", "CHECK", "NOT NULL", "PRIMARY KEY"],
    answer: 2
  }
  ];
  
 // DOM elements
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result");

// Render the quiz questions
function renderQuiz() {
  questionContainer.textContent = "Answer all questions below:";
  optionsContainer.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const questionEl = document.createElement("div");
    questionEl.classList.add("question-block");

    const title = document.createElement("p");
    title.textContent = `Q${qIndex + 1}. ${q.question}`;
    questionEl.appendChild(title);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${qIndex}" value="${optIndex}">
        ${opt}
      `;
      questionEl.appendChild(label);
      questionEl.appendChild(document.createElement("br"));
    });

    optionsContainer.appendChild(questionEl);
  });
}

// Load quiz
renderQuiz();

// Handle submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, qIndex) => {
    const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });

  // Save to Firestore if user is logged in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const email = user.email;
      
      try {
        await addDoc(collection(db, "quizScores"), {
          email: email,
          score: score,
          total: questions.length,
          timestamp: new Date(),
        });
        resultContainer.textContent = `Quiz submitted! Your score: ${score}/${questions.length}`;
        setTimeout(() => {
          window.location.href = "login.html";
        }, 3000);
      } catch (error) {
        resultContainer.textContent = "Error saving score. Please try again.";
        console.error(error);
      }
    } else {
      resultContainer.textContent = "You must be logged in to submit the quiz.";
    }
  });
});
