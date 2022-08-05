import inquirer from 'inquirer';
import fs from "node:fs/promises";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

console.log(import.meta.url) // file:///Users/zhentianwan/Documents/learning/cli-tools/service.js
// in CommonJS, you can get the filename by __filename
console.log(fileURLToPath(import.meta.url)) // /Users/zhentianwan/Documents/learning/cli-tools/service.js
console.log(dirname(fileURLToPath(import.meta.url))) // /Users/zhentianwan/Documents/learning/cli-tools
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, "data.json");

export default function run( ){
    async function askQuestion( ){
        const data = await dataFile;
        const parsedData = JSON.parse(data.toString());
        const target = parsedData[Math.floor(Math.random() * parsedData.length)];
        const { question, answer } = target;

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'answer',
                message: question
            },
            // {
            //     type: 'list',
            //     name: 'location',
            //     message: 'Where do you live?',
            //     choices: ['New York', 'San Francisco', 'Los Angeles']
            // }
        ])

        target.lastAnsweredCorrect = checkAnswer(answers.answer, answer);
        target.lastAsked = Date.now().toString()
        
        const newData = parsedData.filter(item => item.id !== target.id)
        newData.push(target)

        await fs.writeFile("./data.json", JSON.stringify(newData))
    }

    askQuestion()
}

async function checkAnswer(input, answer) {
    console.log(`You answered: ${input}.`);
    console.log(`The actual answer is: ${answer}.`);
  
    const response = await inquirer.prompt([
      { message: "Did you get it right?", name: "correct", type: "confirm" },
    ]);
  
    return response.correct;
}

export async function addQuestion() {
    console.log("Hello, let's add a new question!");
    const responses = await inquirer.prompt([
        {
          type: "input",
          name: "targetquestion",
          message: "What is your question?",
        },
        { type: "input", name: "targetanswer", message: "What is your answer?" },
      ]);
      const data = await fs.readFile(dataFile);
      const parsedData = JSON.parse(data.toString());

      parsedData.push({
        id: getId(parsedData),
        question: responses.targetquestion,
        answer: responses.targetanswer,
      });
    
      await fs.writeFile(dataFile, JSON.stringify(parsedData));

      console.log("All added!");
}

function getId(data) {
    return Math.max(...data.map((item) => item.id)) + 1;
  }