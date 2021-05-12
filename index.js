const mysql = require('mysql');
const inquirer = require('inquirer');
const console = require('console');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'company_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
    start();
})

const start = () => {
    inquirer.prompt([
        {
            name: 'firstPrompt',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee',  'View Departments', 'View Roles', 'View Employees', 'Update Roles', 'Exit']
        }
    ]).then((answer) => {
        switch(answer.firstPrompt) {
            case 'Add Departmentt':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDeparments();
                break;
            case 'View Roles':
                viewRoles();
            case 'View Employees':
                viewEmployees();
                break;
            case 'Update Roles':
                updateRoles();
                break;
            default: connection.end()
        }
    });
};

