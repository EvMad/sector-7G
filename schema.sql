DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
id VARCHAR(30) NOT NULL,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles(
id VARCHAR(30) NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
dept_id VARCHAR(30) DEFAULT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT(11) NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) DEFAULT NULL,
last_name VARCHAR(30) DEFAULT NULL,
role_id VARCHAR(30) DEFAULT NULL,
manager_id VARCHAR(30) DEFAULT NULL,
PRIMARY KEY (id)
);