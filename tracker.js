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
            'See a department',
            'See job roles',
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

            case 'See a department':
                viewDept();
                break;
            
            case 'See job roles':
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
        // connection.end();
    });
    runPrompt();
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
    inquirer.prompt([
        {
        name: 'addPerson',
        type: 'input',
        message:'enter employee first name'},
        {
            name:'addLast',
            type: 'input',
            message: 'what is the employee last name?'
        },
        {
            name: 'addRole',
            type: 'list',
            message: 'Choose a role id:',
            choices: ['gen', 'jdv', 'sdv', 'lgl', 'hrd', 'mng']
        },
        {
            name: 'addMng',
            type: 'list',
            message: 'Assign a manager:',
            choices: ['MW', 'GW']
        }

    ])
    .then((answer) => {console.log('Adding a new employee...\n');
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: answer.addPerson,
            last_name: answer.addLast,
            role_id: answer.addRole,
            manager_id: answer.addMng,
        },
        (err) => {
            if (err) throw err;
            console.log('Employee added!\n');
            
        }
        
    );

});
};

const addRole = () => {
    inquirer.prompt([
        {
        name: 'addTitle',
        type: 'input',
        message:'Enter new role/title name:'},
        {
            name:'addNewRoleId',
            type: 'input',
            message: 'Enter new role ID as three character abbreviation:'
        },
        {
            name:'addSalary',
            type: 'input',
            message: 'Enter salary:'
        },
        {
            name: 'chooseDept',
            type: 'list',
            message: 'Choose a department:',
            choices: ['gen', 'mgt', 'lgl', 'inf', 'hrd'],
        },
    

    ])
    .then((answer) => {console.log('Adding a new role...\n');
    connection.query(
        'INSERT INTO roles SET ?',
        {
            id: answer.addNewRoleId,
            title: answer.addTitle,
            salary: answer.addSalary,
            dept_id: answer.chooseDept,
        },
        (err) => {
            if (err) throw err;
            console.log('New role added!\n');
            
        }
        
    );
});
};

const addDept = () => {
    inquirer.prompt([
        {
        name: 'addDept',
        type: 'input',
        message:'Enter new department name:'},
        {
            name:'addDeptId',
            type: 'input',
            message: 'Enter new dept ID as three character abbreviation:'
        },

    ])
    .then((answer) => {console.log('Adding a new department...\n');
    connection.query(
        'INSERT INTO department SET ?',
        {
            id: answer.addDept,
            dept_name: answer.addDeptId,
            
        },
        (err) => {
            if (err) throw err;
            console.log('New department added!\n');
            
        }
        
    );
});
};

const people = [];

const updateEmp = () => {

    const employeeChoices = () => {
       
        connection.query('SELECT last_name FROM employee', (err, res) => {
            if (err) throw err;
                res.push(people);
            })
    };

    employeeChoices();

    inquirer.prompt([
        {
        name: 'upEmp',
        type: 'list',
        message:'Which employee (last name) would you like to update?',
        choices: people,
    },
        {
            name:'empRole',
            type: 'list',
            message: 'Choose a new role:',
            choices: ['gen', 'jdv', 'sdv', 'lgl', 'hrd', 'mng'],
        },

    ])
    .then((answer) => {console.log('Updating employee role...\n');
    connection.query(
        'UPDATE employee SET ? WHERE ?',
        {
            first_name: answer.upEmp,
        },
        {
            role_id: answer.empRole,
            
        },
        (err) => {
            if (err) throw err;
            console.log('New role assigned!\n');
            
        }
        
    );
});
};