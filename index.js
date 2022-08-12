const inquirer = require('inquirer');
const mysql = require('mysql2');
// Connect to the database so we can send and receive information.
const db = mysql.createConnection({
	host: 'localhost',
	database: 'CMS_db',
	user: 'root',
	password: 'S1lv3rQu1ck!',
});

// List of options to give to the user at the start then after every function.
startPrompt = () => {
	inquirer
		.prompt([
			{
				message: 'Please Select an option from below',
				type: 'list',
				name: 'reply',
				choices: [
					{
						name: 'View All Departments',
						value: 'viewAllDepartments',
					},
					{
						name: 'View All Roles',
						value: 'viewAllRoles',
					},
					{
						name: 'View All Employees',
						value: 'viewAllEmployees',
					},
					{
						name: 'Add A Department',
						value: 'addADepartment',
					},
					{
						name: 'Add A Role',
						value: 'addARole',
					},
					{
						name: 'Add An Employee',
						value: 'addAnEmployee',
					},
					{
						name: 'Update An Employee Role',
						value: 'updateAnEmployeeRole',
					},
					{
						name: 'Exit',
						value: 'exit',
					},
				],
			},
		])
		//Let the user close the app using exit or activate the function they chose.
		.then((answers) => {
			if (answers.reply === 'exit') {
				console.log('Goodbye!');
				process.exit();
			} else {
				functionList[answers.reply]();
			}
		});
};
//Fucntions to view all of the information in specific tables.
const viewAllDepartments = () => {
	console.log('You have selected to view all departments. ----------');
	//Connect to the database then pull all from departments
	db.query(`SELECT * FROM department`, (err, allDepartments) => {
		if (err) {
			console.log(err.sqlMessage);
			console.log(`Error Code: ${err.errno}`);
		} else {
			console.table(allDepartments);
			// Let the user pick the next action again
			startPrompt();
		}
	});
};

const viewAllRoles = () => {
	console.log('You have selected to view all roles. ----------');
	db.query(`SELECT * FROM roles`, (err, allRoles) => {
		if (err) {
			console.log(err.sqlMessage);
			console.log(`Error Code: ${err.errno}`);
		} else {
			console.table(allRoles);
			startPrompt();
		}
	});
};

const viewAllEmployees = () => {
	console.log('You have selected to view all employees. ----------');
	db.query(`SELECT * FROM employee`, (err, allEmployees) => {
		if (err) {
			console.log(err.sqlMessage);
			console.log(`Error Code: ${err.errno}`);
		} else {
			console.table(allEmployees);
			startPrompt();
		}
	});
};

//Functions to add information to the different tables
const addADepartment = async () => {
	console.log('You have selected to add a department. ----------');
	//Gives the value for which table we are going to update then passes it to the sendToDatabase function.
	let deptDatabase = 'department';
	let answers = await inquirer.prompt([
		{
			message: 'What is the department id?',
			type: 'number',
			name: 'id',
		},
		{
			message: 'What is the department name?',
			type: 'text',
			name: 'dept_name',
		},
	]);
	//Sends the answers to the above questions to the database.
	sendToDatabase(answers, deptDatabase);
};

const addARole = async () => {
	console.log('You have selected to add a role. ----------');
	let databaseName = 'roles';
	let answers = await inquirer.prompt([
		{
			message: 'What is the id for this role?',
			type: 'number',
			name: 'id',
		},
		{
			message: 'What is the name of the role?',
			type: 'text',
			name: 'title',
		},
		{
			message: 'What is the salary for this role?',
			type: 'number',
			name: 'salary',
		},
		{
			message: 'What department id is thie role under?',
			type: 'text',
			name: 'department_id',
		},
	]);
	sendToDatabase(answers, databaseName);
};

const addAnEmployee = async () => {
	console.log('You have selected to add an employee. ----------');
	let databaseName = 'employee';
	let answers = await inquirer.prompt([
		{
			message: "What is this employee's first name?",
			type: 'text',
			name: 'first_name',
		},
		{
			message: "What is this employee's last name?",
			type: 'text',
			name: 'last_name',
		},
		{
			message: "What role id matches this employee's role?",
			type: 'text',
			name: 'roles_id',
		},
		{
			message: 'Is this employee a manager?',
			type: 'list',
			name: 'manager',
			choices: [
				{
					name: 'Yes',
					value: false,
				},
				{
					name: 'No',
					value: true,
				},
			],
		},
		{
			message: "What is this employee's manager's id?",
			type: 'number',
			name: 'manager_id',
			when(answers) {
				return answers.manager;
			},
		},
	]);
	delete answers.manager;
	sendToDatabase(answers, databaseName);
};
//Function to update an employee with a new role
const updateAnEmployeeRole = () => {
	console.log('You have selected to update an employee role. ----------');
	inquirer
		.prompt([
			{
				message: 'What is the id of the employee we need to update?',
				type: 'input',
				name: 'id',
			},
			{
				message: "What is this employee's new role id?",
				type: 'input',
				name: 'roles_id',
			},
		])
		.then((answers) => {
			//Connects to the database then picks which value to update based off the id
			db.query(
				`UPDATE employee SET ? WHERE id = ${answers.id}`,
				answers,
				(err) => {
					if (err) {
						console.log(err.sqlMessage);
						console.log(`Error Code: ${err.errno}`);
						startPrompt();
					} else {
						console.log('Successfully Updated Employee');
						startPrompt();
					}
				}
			);
		});
};

//Storing all the functions so they can easily be accessed by the startPrompt
const functionList = {
	viewAllDepartments,
	viewAllRoles,
	viewAllEmployees,
	addADepartment,
	addARole,
	addAnEmployee,
	updateAnEmployeeRole,
};
// Takes in which database we need to write to and the answers to the questions then connects to the db and send the info.
const sendToDatabase = (data, dbName) => {
	//Connects to the database then uses the passed in value to choose between the 3 tables.
	db.query(`INSERT INTO ${dbName} SET ?`, data, (err) => {
		if (err) {
			console.log('There was an error with creating the new entry');
			//Gives user advise on the more frequent errors we have seen.
			if (err.code === 'ER_DUP_ENTRY') {
				console.log('That Id already exists please choose a different id');
			} else if (err.errno === 1452) {
				console.log(
					'An id that was entered does not exist please enter an id that has been entered into the database'
				);
				startPrompt();
			} else {
				console.log(err.sqlMessage);
				console.log(`Error Code: ${err.errno}`);
				startPrompt();
			}
		} else {
			console.log(`You have successfully added to the database`);
			startPrompt();
		}
	});
};

//Initalize the Script
startPrompt();
