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

console.log(document.getElementById("hello").offsetWidth);