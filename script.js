const terminalForm = document.querySelector("#terminal-form");
const commandInput = document.querySelector("#command-input");
const terminalOutput = document.querySelector("#terminal-output");

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
            addOutput("Available commands: help, pwd, echo, clear");
            break;

        case "pwd":
            addOutput("/home/student");
            break;

        case "echo":
            addOutput(commandArguments.join(" "));
            break;
            
        case "clear":
            terminalOutput.replaceChildren();
            break;

        default:
            addOutput(`Command not found: ${command}`);
    }
}

function addOutput(text) {
    const outputLine = document.createElement("p");

    outputLine.textContent = text;
    terminalOutput.appendChild(outputLine);
}