const display = document.getElementById("display");

function appendToDisplay(input) {
    // Remove error/initial state styling
    display.classList.remove('error');
    
    if (display.value == "Error" || display.value == "0") {
        display.value = "";
    }
    display.value += input;
    animateDisplay();
}

function clearDisplay() {
    display.value = "0";
    display.classList.remove('error');
    animateDisplay();
}

function calculate() {
    try {
        display.value = eval(display.value);
        animateDisplay();
    }
    catch (error) {
        display.value = "Error";
        display.classList.add('error');
        animateDisplay();
    }
}

function animateDisplay() {
    display.classList.remove('updating');
    // Trigger reflow to restart animation
    void display.offsetWidth;
    display.classList.add('updating');
}

function deleteLast() {
    if (display.value !== "0" && display.value !== "Error") {
        display.value = display.value.slice(0, -1);
        if (display.value === "") {
            display.value = "0";
        }
    }
    animateDisplay();
}

function highlightButton(key) {
    let button = null;
    
    // Map keys to buttons
    const keyMap = {
        '+': 0, '7': 1, '8': 2, '9': 3,
        '-': 4, '4': 5, '5': 6, '6': 7,
        '*': 8, '1': 9, '2': 10, '3': 11,
        '/': 12, '0': 13, '.': 14, '=': 15
    };
    
    // Find the button
    const buttons = document.querySelectorAll('button');
    if (keyMap[key] !== undefined) {
        button = buttons[keyMap[key]];
    } else if (key === 'C' || key === 'Delete') {
        button = buttons[16]; // C button
    }
    
    if (button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 150);
    }
}

// Keyboard support with visual feedback
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9+\-*/.]/i.test(key)) {
        appendToDisplay(key);
        highlightButton(key);
    }
    // Enter or = to calculate
    else if (key === 'Enter' || key === '=') {
        calculate();
        highlightButton('=');
    }
    // Backspace to delete last digit
    else if (key === 'Backspace') {
        deleteLast();
        highlightButton('Delete');
    }
    // C to clear
    else if (key.toLowerCase() === 'c') {
        clearDisplay();
        highlightButton('C');
    }
});

clearDisplay();