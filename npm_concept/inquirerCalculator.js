import inquirer from 'inquirer';

async function main() {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'number',
                name: 'num1',
                message: 'Enter the first number: '
            },
            {
                type: 'number',
                name: 'num2',
                message: 'Enter the second number: '
            },
            {
                type: 'list',
                name: 'operator',
                message: 'Select the operator you want to perform:',
                choices: ['Add', 'Subtract', 'Multiply', 'Divide']
            }
        ]);
        let result;
        switch (answer.operator) {
            case 'Add':
                result = answer.num1 + answer.num2;
                console.log("The answer for addition is: " + result);
                break;
            case 'Subtract':
                result = answer.num1 - answer.num2;
                console.log("The answer for subtraction is: " + result);
                break;
            case 'Multiply':
                if (answer.num2 === 0 || answer.num2 === 0) {
                    console.log("Error: Cannot multiply by zero.");
                } else {
                    result = answer.num1 * answer.num2;
                    console.log("The answer for multiplication is: " + result);
                }
                break;
            case 'Divide':
                if (answer.num1 === 0 || answer.num2 === 0) {
                    console.log("Error: Cannot divide by zero.");
                } else {
                    result = answer.num1 / answer.num2;
                    console.log("The answer for division is: " + result);
                }
                break;
        }
    } catch (error) {
        console.error(error);
    }
}
main();