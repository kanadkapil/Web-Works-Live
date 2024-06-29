document.addEventListener('DOMContentLoaded', (event) => {
    let input = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('button'); // Select all button elements

    let string = "";
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.innerHTML == '=') {
                try {
                    string = eval(string); // Use try-catch to handle invalid expressions
                    input.value = string;
                } catch {
                    input.value = "Error";
                }
            } else if (e.target.innerHTML == 'AC') {
                string = '';
                input.value = string;
            } else if (e.target.innerHTML == 'DEL') {
                string = string.substring(0, string.length - 1);
                input.value = string;
            } else {
                string += e.target.innerHTML;
                input.value = string;
            }
        });
    });
});
