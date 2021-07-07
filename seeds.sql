INSERT INTO department (id, dept_name)
VALUES ("gen", "general"), ("mgt", "management"), ("inf","information"), ("lgl", "legal");

INSERT INTO roles (id, title, salary, dept_id)
VALUES ("emp", "employee", 50000.00, "gen"), ("mng", "manager", 175000.00, "mgt"), ("sdv", "senior developer", 150000.00, "inf");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", "emp", "MW"), (0, "Jane", "Doe", "sdv", "GW") (2, "George", "Washington", "mng", "MW"), (3, "Martha", "Washington", "mng", "n/a");


SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM roles;