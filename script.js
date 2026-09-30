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
    
    if (command ==="help") {
        addOutput("Available command: help");
    } else {
        addOutput(`Command not found: ${command}`);
    }

    commandInput.value = "";
    commandInput.focus();
});

function addOutput(text) {
    const outputLine = document.createElement("p");

    outputLine.textContent = text;
    terminalOutput.appendChild(outputLine);
}