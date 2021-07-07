INSERT INTO department (dept_name)
VALUES ("general"), ("management"), ("software"), ("legal");

INSERT INTO roles (id, title, salary, dept_id)
VALUES (0, "employee", 50000.00, "gen"), (1, "manager", 175000.00, "mgt"), (2, "senior developer", 150000.00, "inf");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", "emp", "gen"), (0, "Jane", "Doe", "eng", "inf");


SELECT * FROM employee;