const express = require('express');
const mysql = require('mysql2');
const question = require('inquirer');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
  {
    host: process.env.dbname,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: 'Employee_db'
  },
  console.log(`Connected to the Employee_db database.`)
);
//prompt user for choices
const choices = [
  {
    type: 'list',
    name: 'choices',
    message: 'What would you like to do?',
    choices: [
      'View All Employess',
      'Add Employess',
      'Update Employee Role',
      'View all Roles',
      "Add Roles",
      "View All Departments",
      "Add department"
    ]
  }
];

function displaymenu() {
  question.prompt(choices).then(answers => {
    const answer = answers.choices;
    console.log(answer);
    if (answer === 'View All Departments') {
      //Get all departments
      console.log("hi");
      const sql = `SELECT dep_id,dep_name FROM departments`;
      db.query(sql, (err, rows) => {
        if (err) {
          return (err);
        }
        console.table(rows);
        displaymenu();
      });
    } else if (answer === 'Add department') {
      //Insert into department
      inquirer.prompt({
        type: 'input',
        name: "name",
        message: "what is the department you want to add?"
      }).then(answers => {
        const sql = `INSERT INTO departments (dep_name) VALUES (?)`;
        db.query(sql, answers.name, (err, result) => {
          if (err) {
            return (err);
          }
          console.log("Added department");
        });
        displaymenu();
      });
    } else if (answer === 'View all Roles') {
      //Get all roles 
      const sql = `SELECT role_id,title,salary,department_id FROM roles`;
      db.query(sql, (err, rows) => {
        if (err) {
          return (err);
        }
        console.table(rows);
        displaymenu();
      });
    } else if (answer === 'Add Roles') {
      //Insert into roles
      consoleTable()
      inquirer.prompt([{
        type: 'input',
        name: "role",
        message: "what is the Role you want to add?"
      },
      {
        type: 'input',
        name: "salary",
        message: "what is the Salary of the role you want to add?"
      },
      {
        type: 'input',
        name: "department_id",
        message: "what is the id of the department of the role?"
      }
      ]).then(answers => {
        const sql = `INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`;
        db.query(sql, [answers.role, answers.salary, answers.department_id], (err, result) => {
          if (err) {
            return (err);
          }
          console.log("Added Roles");
        });
        displaymenu();
      });
    } else if (answer === 'Update Employee Role') {
      //update employee roles
      const sql = 'SELECT employee_id,first_name,last_name,role_id FROM employees';
      db.query(sql, (err, rows) => {
        if (err) {
          return (err);
        }
        console.table(rows);
      });
      inquirer.prompt([{
        type: 'input',
        name: "name",
        message: "what is the Name of the Employee you want to change?"
      },
      {
        type: 'input',
        name: "role",
        message: "what is the id of the role you want to change to?"
      }
      ]).then(answers => {
        const sql = `UPDATE employees SET role_id = ? WHERE first_name = ?`;
        db.query(sql, [answers.role, answers.name], function (err, result) {
          if (err) throw err;
          console.log("Employess updated successfully");
          displaymenu();
        });
      });
    } else if (answer === 'View All Employess') {
      //Get all employees
      const sql = 'SELECT employee_id,first_name,last_name,role_id FROM employees';
      db.query(sql, (err, rows) => {
        if (err) {
          return (err);
        }
        console.table(rows);
        displaymenu();
      });
    } else if (answer === 'Add Employess') {
      //insert into employees
      const sql = `SELECT role_id,title,salary,department_id FROM roles`;
      db.query(sql, (err, rows) => {
        if (err) {
          return (err);
        }
        console.table(rows);
      });
      inquirer.prompt([{
        type: 'input',
        name: "first_name",
        message: "what is the first Name of the Employee you want to Add?"
      },
      {
        type: 'input',
        name: "last_name",
        message: "what is the Last name of the Employee you want to Add?"
      },
      {
        type: 'input',
        name: "manager_id",
        message: "what is Manager's Id for this Employee you want to Add?"
      },
      {
        type: 'input',
        name: "role_id",
        message: "what is the role Id of this Employee you want to Add?"
      },
      ]).then(answers => {
        const sql = `INSERT INTO employees (first_name,last_name,manager_id,role_id) VALUES (?,?,?,?)`;
        db.query(sql, [answers.first_name, answers.last_name, answers.manager_id,answers.role_id], (err, result) => {
          if (err) {
            console.log(err);
          }
          displaymenu();
        });
      });
    }
  });
};

displaymenu();

