const mysql = require('mysql');
const inquirer = require('inquirer');
const console = require('console.table');

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

const addDepartment= () => {
    inquirer.prompt([
        {
            name:'departmentName',
            type: 'input',
            message: 'What department do you want to add?'
        }
    ]).then((answer) => {
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
                department_name: answer.departmentName
            },
            (err) => {
                if (err) throw err;
                console.log ('Deparment Added Successfully')
            }
        );
        start();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What role do you want to add?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
        },
        {
            name:'departmentID', 
            type: 'input',
            message: 'What is the department ID for this role?'
        }
    ]).then((answer) => {
        const query = connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.departmentID
            },
            (err) => {
                if (err) throw err;
                console.log('Role Added Successfully')
            }
        );
        start();
    });
};