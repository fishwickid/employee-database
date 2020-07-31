var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

connection.connect(function(err) {
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
        "Add role",
        "Department",
        // "Update employee manager",
        "View all roles",
        "Add Role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "exit"
      ]
    })
    .then(function(answer) {
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

      case "Add role":
        addRole();
        break;

      case "Add department":
        addEmployee();
        break;

      case "Update employee manager":
        updateEmployeeManager();
        break;

      case "View all roles":
        viewAllRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "Remove role":
        removeRoll();
        break;

      case "View all departments":
        viewAllDepartments();
        break;

      case "Add department":
        addDepartment();
        break;

      case "Remove department":
        removeDepartment();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}


function showEmployees() {
  var query = "SELECT * FROM employee;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}


function showRoles() {
  var query = "SELECT * FROM roles;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}


function showDepartments() {
  var query = "SELECT * FROM department;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
}


function addEmployee() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}
