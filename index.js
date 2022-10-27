const inquirer = require('inquirer');
const fs = require('fs');
const generateTeam = require('./src/template.js');

// team modules generation
const engineer = require('./team/engineer');
const intern = require('./team/intern');
const manager = require('./team/manager');

// answers to questions in an array
const StaffMemberData = [];

// cli questions 
//  async is for promises, and to interact with the awit clause to wait for user input before making next decision
const questions = async () => {
    const answers = await inquirer.prompt ([
        {
            type: 'input',
            message: 'whats your name',
            name: 'name',
        },
        {
            type: 'input',
            message: 'what is your id number?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'what is your email?',
            name: 'email'
        },
        {
            type: 'list',
            message: 'what is your role?',
            name: 'role',
            choices: ['intern', 'manager', 'engineer'],
        },
    ])

    if (answers.role === "manager") {
        const managerAns = await inquirer.prompt([
            {
                type: 'input',
                message: 'office number?',
                name: 'officeNumber',
            },
        ])
        const newManager = new manager(
            answers.name,
            answers.email,
            answers.id,
            managerAns.officeNumber

        );
        
        StaffMemberData.push(newManager);
    } else if (answers.role === 'engineer') {
        const githubAns = await inquirer.prompt([
            {
                type: 'input',
                message: 'Github username?',
                name: 'github',
            }
        ])
        const newEngineer = new engineer(
            answers.name,
            answers.email,
            answers.id,
            githubAns.github
        );
        StaffMemberData.push(newEngineer);
    } else if (answers.role === 'intern') {
        const internAns = await inquirer.prompt([
            {
                type: 'input',
                message: 'what school do you attend?',
                name: 'school',
            },
        ])
        const newIntern = new intern(
            answers.name,
            answers.email,
            answers.id,
            internAns.school
        );
        StaffMemberData.push(newIntern);
    }
};
async function promptQuestions() {
    await questions()

    const addMemberAns = await inquirer.prompt([
        {
            name: 'addMember',
            type: 'list',
            choices: ['New member?', 'create team?'],
            message: 'next decision?'
        }
    ])

    if (addMemberAns.addMember === 'Add a new member?') {
        return promptQuestions()
        // can it change to just exporting team?
    } else
    return createTeam();

}

promptQuestions();

function createTeam () {
    console.log('new person', StaffMemberData)
    fs.writeFileSync(
        "./export/index.html",
        generateTeam(StaffMemberData),
        "utf-8"
    );
}