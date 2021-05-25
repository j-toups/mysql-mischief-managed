DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	department_id int auto_increment,
    name varchar(30),
    primary key (department_id)
);

CREATE TABLE role (
	role_id int primary key auto_increment,
    title varchar(30),
    salary decimal not null, 
    department_id int
);

CREATE TABLE employee (
    employee_id int auto_increment primary key,
    first_name varchar(30) not null, 
    last_name varchar(30) not null, 
    role_id int not null, 
    manager_id int, 
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);