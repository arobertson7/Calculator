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
        return "Das ist verboten!";
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

// ** Only to be called within changeDisplay(). Used to evaluate math expressiona in (a, operator, b) format
function evaluateExpression(expressionString)
{
    let operator = "";
    let operatorIndex = 0;
    for (let i = 0; i < expressionString.length; i++) // find the operator in the string and store its index;
    {
        if (isNaN(expressionString[i]))
        {
            operator = expressionString[i];
            operatorIndex = i;
        }
    }

    let firstNum = Number(expressionString.substring(0, operatorIndex)); // operand 1
    let secondNum = Number(expressionString.substring(operatorIndex + 1)); // operand 2
    return operate(firstNum, operator, secondNum);
}

// Display functions
const MAX_DISPLAY_SIZE = 14; // number of digits that will fit on the display as of now
let currentDisplaySize = 0;
let expressionString = ""; // a string to hold the expression
let hasOperator = false; // true if expressionString already holds an operator (Only allows one operator until cleared or evaluated)
                         // essentially disables operator buttons until "clear" or evaluate

                         
function changeDisplay(button)
{
    const display = (document.querySelector(".display")).children[0]; // getting actual <p> element within display
    if (button == "C") // If "clear"
    {
        display.textContent = "0";
        currentDisplaySize = 0;
        expressionString = ""; // clear expressionString
        hasOperator = false; // reset single operator condition
    }
    else if (!isNaN(button)) // If number
    {
        if (currentDisplaySize == 0) // If the display is currently empty, remove the "0" from the display before appending new numbers
        {
            display.textContent = "";
        }
        if (currentDisplaySize < MAX_DISPLAY_SIZE)
        {
            display.textContent += button;
            currentDisplaySize++;
            expressionString += button; // append the number to the expressionString
        }
    }
    else if (button == "x" || button == "+" || button == "-" || button == "/") // If operator
    {
        if (expressionString != "") // expression must start with a number before adding operator
        {
            if (!hasOperator)
            {
                expressionString += button; // append operator to the expressionString
                currentDisplaySize = 0; // display will reset for next number
                hasOperator = true;
            }
            // If user already pressed an operator, let them change the operator before typing second number
            else if (hasOperator && isNaN(expressionString[expressionString.length - 1])) // <- 2nd condition: most recent button pressed must be an operator
            {
                expressionString = expressionString.substring(0, expressionString.length - 1);
                expressionString += button;
            }
            // Allow user to chain calculations (make further operations without having to press "=")
            else if (hasOperator && !isNaN(expressionString[expressionString.length - 1]))
            {
                result = evaluateExpression(expressionString);
                display.textContent = result; // display result
                expressionString = String(result) + button; // update expressionString to now contain result with new operator appended
                currentDisplaySize = 0;
            }
        }
    }
    else if (button == "=")
    {
        if (expressionString.length > 0 && hasOperator && !isNaN(expressionString[expressionString.length - 1])) // if expression is empty, does not have an operator, or does not end with a number, do nothing.
        {
            result = evaluateExpression(expressionString);
            display.textContent = result; // display result
            expressionString = String(result); // update expressionString to now contain result for further operations
            hasOperator = false; // reset so next operation can happen
            currentDisplaySize = 0;
        }  
    }
}

const buttons = (document.querySelector(".button-container")).querySelectorAll("button");
// Event listeners for button click to call changeDisplay()
buttons.forEach((button) => {
    button.addEventListener("click", function() {
    changeDisplay(this.textContent);
})});