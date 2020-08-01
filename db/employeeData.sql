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
    ('Bobby', 'BigCheese', 1, NULL),
    ('Carol', 'Baskin', 2, 1),
    ('Lewis', 'Lion', 3, NULL),
    ('Kevin', 'Hart', 4, 3),
    ('Doug', 'McCarthy', 5, NULL),
    ('Connor', 'Mcgregor', 6, 5),
    ('Aubrey', 'Marcus', 7, NULL),
    ('Ryan', 'Chapman', 8, 7);
