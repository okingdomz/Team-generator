
const inquirer = require('inquirer');
const fs = require('fs');


// team modules generation
const engineer = require('./team/engineer');
const intern = require('./team/intern');
const manager = require('./team/manager');

// added for team push
// const OUTPUT_DIR = path.resolve(__dirname, "export");
// const outputPath = path.join(OUTPUT_DIR, "index.html");
const generateTeam = require('./src/template.js')


// answers to questions in an array
// const StaffMemberData = [];
const StaffMemberData = [];

// function TeamGen () {
//     function createTeam () {
//         inquirer.prompt([{
//             type: 'list',
//             message: 'what is your role?',
//             name: 'addEmployeePrompt',
//             choices: ['intern', 'manager', 'engineer']
//         }]).then(function (userInput) {
//             switch(userInput.addEmployeePrompt) {
//                 case 'manager':
//                     addManager();
//                     break;
//                 case 'engineer':
//                     addEngineer();
//                     break;
//                 case 'intern':
//                     addIntern();
//                     break;
//                 default:
//                     htmlBuilder();
//             }
//         })
//     }
//     function addManager() {
//         inquirer.prompt ([
//             {
//                 type: 'input',
//                 name: 'managerName',
//                 message: 'managers name?'
//             },
//             {
//                 type: 'input',
//                 name: 'managerId',
//                 message: 'what is the managers ID number'
//             },
//             {
//                 type: 'input',
//                 name: 'managerEmail',
//                 message: 'what is the managers email'
//             },
//             {
//                 type: 'input',
//                 name: 'managerOfficeNumber',
//                 message: 'what is the managers office number'
//             }

//         ]).then(answers => {
//             const manager = new Manager(answer.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
//             StaffMemberData.push(manager);
//             createTeam();
//         });
//     }

//     function addEngineer() {
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'engineerName',
//                 message: 'engineers name?'
//             },
//             {
//                 type: 'input',
//                 name: 'engineerId',
//                 message: 'what is the engineers ID number'
//             },
//             {
//                 type: 'input',
//                 name: 'engineerEmail',
//                 message: 'what is the engineers email'
//             },
//             {
//                 type: 'input',
//                 name: 'engineerGithub',
//                 message: 'what is the engineers github username'
//             }
//         ]).then(answers => {
//             const engineer = new engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
//             StaffMemberData.push(engineer);
//             createTeam();
//         });
//     }
//     function addIntern() {
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'internName',
//                 message: 'intern name?'
//             },
//             {
//                 type: 'input',
//                 name: 'internId',
//                 message: 'intern id?'
//             },
//             {
//                 type: 'input',
//                 name: 'internEmail',
//                 message: 'intern email address?'
//             },
//             {
//                 type: 'input',
//                 name: 'internSchool',
//                 message: 'intern school?'
//             }
//         ]).then(answers => {
//             const intern = new intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
//             StaffMemberData.push(intern);
//             createTeam();
//         });
//     }

//     function htmlBuilder () {
//         console.log('team made for the world')
//         fs.writeFileSync(outputPath, generateTeam(StaffMemberData), 'utf-8')
//     }
//     createTeam();



// }

// TeamGen();

// cli questions 
//  async is for promises, and to interact with the await clause to wait for user input before making next decision
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
    console.log("this is answers : ", answers)
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
    await questions();

    const addMemberAns = await inquirer.prompt([
        {
            name: 'addMember',
            type: 'list',
            choices: ['New member?', 'create team'],
            message: 'next decision?'
        }
    ])
    console.log("this is add memeber answers", addMemberAns)
// might be the problem
    if (addMemberAns.addMember === "New member?") {
        return promptQuestions()
        
    } else{
    return createTeam();
    }

}





function createTeam () {
    //console.log('new person', StaffMemberData)
    try{
   fs.writeFileSync(
        "./export/index.html",
        generateTeam(StaffMemberData),
        "utf-8"
    );
    console.log("file has been created")
   }
   catch(err){
    console.log("THIS IS ERROR: ", err)
   }
    
}

promptQuestions()