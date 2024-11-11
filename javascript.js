// Math functions
function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    if (b == 0)
    {
        return "Das ist verboten. Try again.";
    }
    else
    {
        return a / b;
    }
}

// Operate function
function operate(a, operator, b)
{
    if (operator == "+")
    {
        return add(a, b);
    }
    else if (operator == "-")
    {
        return subtract(a, b);
    }
    else if (operator == "x") // using x here as multiplcation sign
    {
        return multiply(a, b);
    }
    else if (operator == "/")
    {
        return divide(a, b);
    }
}

// Display functions
const MAX_DISPLAY_SIZE = 14; // number of digits that will fit on the display as of now
let currentDisplaySize = 0;
let currentNumber = 0;

function changeDisplay(button)
{
    const display = (document.querySelector(".display")).children[0]; // getting actual <p> element within display
    if (button == "C")
    {
        display.textContent = "0";
        currentDisplaySize = 0;
    }
    else if (!isNaN(button))
    {
        //If the display is currently empty, remove the "0" from the display before appending new numbers
        if (currentDisplaySize == 0)
        {
            display.textContent = "";
        }
        if (currentDisplaySize <= MAX_DISPLAY_SIZE)
        {
            display.textContent += button;
            currentDisplaySize++;
        }
    }
    currentNumber = Number(display.textContent);
}

const buttons = (document.querySelector(".button-container")).querySelectorAll("button");
// Event listeners for button click to call changeDisplay()
buttons.forEach((button) => {
    button.addEventListener("click", function() {
    changeDisplay(this.textContent);
})});