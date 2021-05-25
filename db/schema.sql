DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	department_id int not null auto_increment,
    department_name varchar(30),
    primary key (department_id)
    );

CREATE TABLE company_role (
	role_id int not null auto_increment,
    primary key (role_id),
    -- title varchar(30) not null, 
    salary decimal not null, 
    dept_id int,

CREATE TABLE employees (
    employee_id int not null auto_increment,
    primary key(employee_id),
    first_name varchar(30) not null, 
    last_name varchar(30) not null, 
    employee_role_id int not null, 
    manager_id int, 
);

