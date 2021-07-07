INSERT INTO department (dept_name)
VALUES ("general"), ("management"), ("software");

INSERT INTO roles (title, salary)
VALUES ("employee", 000000), ("manager", 150000), ("senior developer", 150000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (0, "John", "Doe", 0, 0), (0, "Jane", "Doe", 2, 2);