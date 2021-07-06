DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(6,2) NULL,
dept_id INT
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT,
manager_id INT NULL
);