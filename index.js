const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	database: 'CMS_db',
	user: 'root',
	password: 'S1lv3rQu1ck!',
});

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
		.then((answers) => {
			if (answers.reply === 'exit') {
				console.log('Goodbye!');
				process.exit();
			} else {
				functionList[answers.reply]();
			}
		});
};

const viewAllDepartments = () => {
	console.log('You have selected to view all departments. ----------');
	inquirer.prompt();
};

const viewAllRoles = () => {
	console.log('You have selected to view all roles. ----------');
};

const viewAllEmployees = () => {
	console.log('You have selected to view all employees. ----------');
};

const addADepartment = async () => {
	console.log('You have selected to add a department. ----------');
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
			message: 'What is the department id for this role?',
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
			message: "What is this employee's role id?",
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
			message: "What is this employee's manager id?",
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

const updatedAnEmployeeRole = () => {
	console.log('You have selected to update an employee role. ----------');
};

const functionList = {
	viewAllDepartments,
	viewAllRoles,
	viewAllEmployees,
	addADepartment,
	addARole,
	addAnEmployee,
	updatedAnEmployeeRole,
};

const sendToDatabase = (data, dbName) => {
	db.query(`INSERT INTO ${dbName} SET ?`, data, (err) => {
		if (err) {
			console.log('There was an error with creating the new entry');
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
