import readline from 'node:readline/promises';

export default async function run() {
    const rl = readline.createInterface({
        terminal: true,
        input: process.stdin,
        output: process.stdout
    })

    const answer = await rl.question("What is your name? ");
    console.log(`Your name is ${answer}`);

    const answer2 = await rl.question("Where do you live? ");
    console.log(`You live in ${answer2}`);

    rl.close()
}