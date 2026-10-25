const terminalForm = document.querySelector("#terminal-form");
const commandInput = document.querySelector("#command-input");
const terminalOutput = document.querySelector("#terminal-output");

// Simulated home directory contents
const homeDirectoryContents = [
    "documents",
    "projects",
    "welcome.txt"
];

// Simulated files
const virtualFiles = {
    "welcome.txt": "Welcome to SisuShell! Here you can learn Linux commands."
};

terminalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const input = commandInput.value.trim();

    if (input === "") {
        return;
    }

    addOutput(`student@sisushell:~$ ${input}`);
    executeCommand(input);

    commandInput.value = "";
    commandInput.focus();
});

function executeCommand(input) {
    const parts = input.split(/\s+/);
    const commandName = parts[0];
    const commandArguments = parts.slice(1);

    switch (commandName) {
        case "help":
            addOutput("Available commands: help, pwd, ls, mkdir, cat, echo, clear");
            break;

        case "pwd":
            addOutput("/home/student");
            break;

        case "ls":
            addOutput(homeDirectoryContents.join(" "));
            break;

        case "mkdir":
            runMkdirCommand(commandArguments);
            break;

        case "cat":
            runCatCommand(commandArguments);
            break;

        case "echo":
            addOutput(commandArguments.join(" "));
            break;
            
        case "clear":
            terminalOutput.replaceChildren();
            break;

        default:
            addOutput(`Command not found: ${commandName}`);
    }
}

function runMkdirCommand(args) {
    const directoryName = args[0];

    if (!directoryName) {
        addOutput("mkdir: missing operand");
        return;
    }

    if (homeDirectoryContents.includes(directoryName)) {
        addOutput(
            `mkdir: cannot create directory '${directoryName}': File exists`
        );
        return;
    }

    homeDirectoryContents.push(directoryName);
}

function runCatCommand(args) {
    const fileName = args[0];

    if (!fileName) {
        addOutput("cat: missing file operand");
        return;
    }

    if (virtualFiles[fileName] === undefined) {
        addOutput(`cat: ${fileName}: No such file or directory`);
        return;
    }

    addOutput(virtualFiles[fileName]);
}

function addOutput(text) {
    const outputLine = document.createElement("p");

    outputLine.textContent = text;
    terminalOutput.appendChild(outputLine);
}