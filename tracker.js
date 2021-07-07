require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    runPrompt();
});

const runPrompt = () => {

    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'See all Employees',
            'Search all Employees',
            'See a department',
            'See a job role',
            'Add an employee',
            'Add a role',
            'Add a department',
            'Update an employee role',
            'Exit',

        ],

    })
    .then((answer) => {
        switch (answer.action) {
            case 'See all Employees':
                viewAll();
                break;

            case 'Search all Employees':
                searchAll();
                break;

            case 'See a department':
                viewDept();
                break;
            
            case 'See a job role':
                viewRole();
                break;

            case 'Add an employee':
                addEmp();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add a department':
                addDept();
                break;

            case 'Update an employee role':
                updateEmp();
                break;

            default:
                console.log(`Invalid action: ${answer.action}`);
                break;

        }
    });
};

const viewAll = () => { 
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
        };

const searchAll = () => {
    inquirer.prompt({
        name: 'employee',
        type: 'input',
        message: 'Which employee would you like to search for?',
    })
    .then((answer) => {
        const query = 'SELECT first_name, last_name FROM employee';
        connection.query(query, { employee: answer.employee }, (err,res) => {
            if (err) throw err;
            res.forEach(({ first_name, last_name }) => {
                console.log(`Employee: ${first_name} ${last_name}`);
        });
        runPrompt();
        });
    });
};

const viewDept = () => {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Which department would you like to search for?',
    })
    .then((answer) => {
        const query = 'SELECT dept_name FROM department';
        connection.query(query, { department: answer.department }, (err,res) => {
            if (err) throw err;
            res.forEach(({ dept_name }) => {
                console.log(`Department: ${dept_name}`);
            });
            runPrompt();
        });
    });
};

const viewRole = () => {
    inquirer.prompt({
        name: 'role',
        type: 'input',
        message: 'Which role would you like to search for?',
    })
    .then((answer) => {
        const query = 'SELECT title FROM roles';
        connection.query(query, {role: answer.role}, (err,res) => {
            if (err) throw err;
            res.forEach(({title}) => {
                console.log(`Role: ${title}`);
            });
            runPrompt();
        });
    });
};

const addEmp = () => {
    inquirer.prompt({
        name: 'addPerson',
        type: 'input',
        message:'enter employee first name'
    },
    {
        name:'addLast',
        type: 'input',
        message: 'what is the employee last name?'

    })
    .then((answer) => {console.log('Adding a new employee...\n');
    const query = connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: answer.addPerson,
        },
        (err, res) => {
            console.log(`${res.affectedRows} emplyee added!\n`);
        }
        
    );
});
};