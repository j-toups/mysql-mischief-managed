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
});

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
            case 'Add Department':
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
            case 'Exit':
                connection.end();
                break;
        }
    });
};

const addDepartment = () => {
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
                name: answer.departmentName
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
            name: 'title',
            type: 'input',
            message: 'What title do you want to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?'
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
                title: answer.title,
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

const addEmployee = () => {
    inquirer.prompt([
        {
            name:'firstName',
            type: 'input',
            message: 'Insert Employee\'s first name',
        },
        {
            name:'lastName',
            type: 'input',
            message: 'Insert Employee\'s surname',
        },
        {
            name:'empRoleID',
            type: 'input',
            message: 'Insert Employee\'s role ID',
        },
        {
            name:'managerID',
            type: 'input',
            message: 'Insert Employee\'s manager'
        }
    ]).then((answer) => {
        const query = connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.empRoleID,
                manager_id: answer.managerID,
            },
            (err) => {
                console.log("err adding employee", err);
            }
        );
        start();
    });
};

const viewDeparments = () => {
    connection.query('SELECT * FROM department', (err, res)=> {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const viewRoles = () => {
    connection.query('SELECT * FROM role INNER JOIN department ON (role.department_id = department.department_id)', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const viewEmployees = () => {
    connection.query('SELECT * FROM employee INNER JOIN role ON (employee.role_id = role.role_id)', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const updateRoles = () => {
    inquirer.prompt([
        {
            name:'employeeID',
            type:'input',
            message: 'Insert ID number of employee you want to update.'
        },
        {
            name: 'newRoleID',
            type: 'input',
            message:'What is the new role ID?'
        }
    ]).then((answer) => {
        const query = connection.query(
            'UPDATE employees SET ? WHERE ?',
            [
                {
                    employee_role_id: answer.employeeID
                },
                {
                    id: answer.newRoleID
                }
            ],
        (err, res) => {
            if (err) throw err;
            console.log('Employee ID Updated');
            start();
        }
        );
    });
};