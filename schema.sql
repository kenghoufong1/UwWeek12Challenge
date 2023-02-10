DROP DATABASE IF EXISTS Employee_db;
CREATE DATABASE Employee_db;

USE Employee_db;

CREATE TABLE departments (
  dep_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL ,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(dep_id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(role_id)
  ON DELETE SET NULL
);

