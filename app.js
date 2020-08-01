var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var cFonts = require("CFonts");

// Title of Application

cFonts.say('Employment|Tracker', {
  font: 'block',
  align: 'left',
  colors: ['system'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
});

// connecting to server

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Show all employees",
        "Show all roles",
        "Show all departments",
        "Add employee",
        "Update role",
        "Add Department",
        "exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Show all employees":
          showEmployees();
          break;

        case "Show all roles":
          showRoles();
          break;

        case "Show all departments":
          showDepartments();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Update role":
          updateRole();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

//Show all employees

function showEmployees() {
  var query = "SELECT * FROM employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}

//Show all roles

function showRoles() {
  var query = "SELECT * FROM roles;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}

//Show all departments

function showDepartments() {
  var query = "SELECT * FROM department;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}


//Add new employee

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is your employees first name?"
      },
      {
        name: "last",
        type: "input",
        message: "What is your employees last name?"
      },
      {
        name: "title",
        type: "list",
        message: "What is your employees role?",
        choices:
          [
            "Fundraising Manager",
            "Fundraising Assistant",
            "Development Manager",
            "Associate Development Manager",
            "Lead Advisor",
            "Associate Advisor",
            "Marketing Manager",
            "Associate Marketing Manager"
          ]
      },
      {
        name: "salary",
        type: "input",
        message: "What is your employees salary?"
      },
      {
        name: "dept",
        type: "list",
        message: "What is your employees department?",
        choices: ["Fundraising", "Development", "Advising", "Marketing"]
      },
      {
        name: "manager",
        type: "list",
        message: "Who is your employees manager?",
        choices: ["Kathy", "Erin", "Paul", "Aubrey", "None"]
      }
    ])
    .then(function (answer) {

      var dept_id;
      if (answer.dept === "Fundraising") {
        dept_id = 1;
      }
      else if (answer.dept === "Development") {
        dept_id = 2;
      }
      else if (answer.dept === "Advising") {
        dept_id = 3;
      }
      else if (answer.dept === "Marketing") {
        dept_id = 4;
      }

      connection.query("INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: dept_id
        },
        function (err, result) {
          if (err) throw err;
        }
      );

      var manager_id;
      if (answer.manager === "Kathy") {
        manager_id = 1;
      }
      else if (answer.manager === "Erin") {
        manager_id = 2;
      }
      else if (answer.manager === "Paul") {
        manager_id = 3;
      }
      else if (answer.manager === "Aubrey") {
        manager_id = 4;
      }
      else if (answer.manager === "None") {
        manager_id = null;
      }

      var role_id;
      if (answer.title === "Fundraising Manager") {
        role_id = 1;
      }
      else if (answer.title === "Fundraising Assistant") {
        role_id = 2;
      }
      else if (answer.title === "Development Manager") {
        role_id = 3;
      }
      else if (answer.title === "Associate Development Manager") {
        role_id = 4;
      }
      else if (answer.title === "Lead Advisor") {
        role_id = 5;
      }
      else if (answer.title === "Associate Advisor") {
        role_id = 6;
      }
      else if (answer.title === "Marketing Manager") {
        role_id = 7;
      }
      else if (answer.title === "Associate Marketing Manager") {
        role_id = 8;
      }

      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: role_id,
          manager_id: manager_id
        },
        function (err, result) {
          if (err) throw err;

          console.log("=== New Employee Added ===");
          runSearch();
        }
      );
    });
}

//Update employee role

function updateRole() {
  connection.query("SELECT id, first_name, last_name FROM employee", function (err, result) {
    if (err) throw err;

    var choiceArray = [];


    for (var i = 0; i < result.length; i++) {
      var choices =  result[i].id;
      // var choices =  `Employee ID:${result[i].id} Name: ${result[i].first_name}`;

      choiceArray.push(choices);


    }

    questions = [
      {
        name: "employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: choiceArray
      },
      {
        name: "newTitle",
        type: "list",
        message: "What is the employee's new role?",
        choices:
          [
            "Fundraising Manager",
            "Fundraising Assistant",
            "Development Manager",
            "Associate Development Manager",
            "Lead Advisor",
            "Associate Advisor",
            "Marketing Manager",
            "Associate Marketing Manager"
          ]
      }]
    inquirer
      .prompt(questions)
      .then(function (answer) {
        console.log(answer.employee);
        console.log(answer.newTitle)

        let role_id = 0;


        if (answer.newTitle == "Fundraising Manager") {
          role_id = 1;
        }
        else if (answer.newTitle == "Fundraising Assistant") {
          role_id = 2;
        }
        else if (answer.newTitle == "Development Manager") {
          role_id = 3;
        }
        else if (answer.newTitle == "Associate Development Manager") {
          role_id = 4;
        }
        else if (answer.newTitle == "Lead Advisor") {
          role_id = 5;
        }
        else if (answer.newTitle == "Associate Advisor") {
          role_id = 6;
        }
        else if (answer.newTitle == "Marketing Manager") {
          role_id = 6;
        }
        else if (answer.newTitle == "Associate Marketing Manager") {
          role_id = 6;
        }


        connection.query("UPDATE employee SET role_id = ? WHERE id=?",
          [role_id, answer.employee],
          function (err, result) {
            if (err) throw err;

            console.log("=== See Your Updated Employee ===", showEmployees());
            runSearch();
          }
        )

      });
  })
}