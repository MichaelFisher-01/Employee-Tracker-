const inquirer = require('inquirer');

startPrompt = () => {
	inquirer
		.prompt([
			{
				message: 'Please Select an option from below',
				type: 'list',
				choices: [
					'View All Departments',
					'View All Roles',
					'View All Employees',
					'Add A Department',
					'Add A Role',
					'Add An Employee',
					'Update An Employee Role',
					'Exit',
				],
				name: 'prompt',
			},
		])
		.then((answers) => {
			if (answers.prompt === 'Exit') {
				console.log('Goodbye!');
			} else {
				console.log(answers);
				startPrompt();
			}
		});
};

startPrompt();
