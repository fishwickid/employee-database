DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO employees (first_name, last_name) VALUES ("Bob", "Jones");
INSERT INTO department (title) VALUES ("Marketing");
INSERT INTO role (title, salary) VALUES ("Marketing manager", "100000");

USE employeeDB;

INSERT INTO department (department)
VALUES ('Fundraising'), ('Development'), ('Advising'), ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Fundraising Manager', 90000, 1),
    ('Fundraising Assistant', 45000, 1),
    ('Development Manager', 70000, 2),
    ('Associate Development Manager', 50000, 2),
    ('Lead Advisor', 70000, 3),
    ('Associate Advisor', 50000, 3),
    ('Marketing Manager', 75000, 4),
    ('Associate Marketing Manager', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Kathy', 'Wetzel-Mastel', 1, NULL),
    ('Ahmed', 'Artan', 2, 1),
    ('Erin', 'Wilson', 3, NULL),
    ('Kevin', 'Guilden', 4, 3),
    ('Paul', 'McCarthy', 5, NULL),
    ('Luiz', 'Mendoza', 6, 5),
    ('Aubrey', 'Koski', 7, NULL),
    ('Ryan', 'Stopera', 8, 7);
