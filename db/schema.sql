DROP DATABASE IF EXISTS CMS_db;
CREATE DATABASE CMS_db;

USE CMS_db;

CREATE TABLE department (
    id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

