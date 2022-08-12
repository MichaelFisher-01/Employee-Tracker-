const inquirer = require('inquirer');

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
			} else {
				console.log(answers.reply);
				userChoice(answers.reply);
			}
		});
};

const viewAllDepartments = () => {
	console.log('You have selected to view all departments');
};

const viewAllRoles = () => {
	console.log('You have selected to view all roles.');
};

const viewAllEmployees = () => {
	console.log('You have selected to view all employees');
};

const addADepartment = () => {
	console.log('You have selected to add a department');
};

const addARole = () => {
	console.log('You have selected to add a role');
};

const addAnEmployee = () => {
	console.log('You have selected to add an employee');
};

const updatedAnEmployeeRole = () => {
	console.log('You have selected to update an employee role');
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

const userChoice = (answer) => {
	functionList[answer]();
	startPrompt();
};

//Initalize the Script
startPrompt();
