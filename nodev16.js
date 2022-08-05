import readline from 'node:readline';

export default function run() {
    const rl = readline.createInterface({
        terminal: true,
        input: process.stdin,
        output: process.stdout
    })
    
    console.log("What is your name?")
    
    let input = "";
    
    rl.input.on("keypress", (event, rl) => {
        // if return key is pressed
        if (rl.name === "return") {
            console.log(`Your name is ${input}.`);
            console.log("Where do you live?")
        } else {
            input += event;
        }
    })
}
