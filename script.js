const terminalForm = document.querySelector("#terminal-form");
const commandInput = document.querySelector("#command-input");
const terminalOutput = document.querySelector("#terminal-output");

terminalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const command = commandInput.value.trim();

    if (command === "") {
        return;
    }

    addOutput(`student@sisushell:~$ ${command}`);
    executeCommand(command);

    commandInput.value = "";
    commandInput.focus();
});

function executeCommand(command) {
    switch (command) {
        case "help":
            addOutput("Available commands: help, clear");
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