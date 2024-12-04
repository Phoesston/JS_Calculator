const buttons = document.querySelectorAll('.btn'); 
const clear = document.getElementById('clear');
const equals = document.getElementById('equals')
let screenValue = ''



buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonValue = button.value; 
        if(buttonValue != '=' && buttonValue != 'c'){
            console.log(buttonValue); 

            screenValue += buttonValue;
            document.getElementById('screen').innerHTML = screenValue;
        }
        

    });
});

//clears the screen
clear.addEventListener('click', function(){
    screenValue = '';
    document.getElementById('screen').innerHTML = '';
});



//Evalates expression using shunting yard
equals.addEventListener('click', function(){

  let token =[];

  function makeToken(screenValue){

    let currentNumber = '';

    for(let i=0; i< screenValue.length;i++){
      if(!isNaN(screenValue[i]) || screenValue[i] ==='.'){//if its a number
        currentNumber += screenValue[i];

      }else{
        if(currentNumber !==''){ //current number is not empty
          token.push(currentNumber);
          currentNumber = '';
        }

        token.push(screenValue[i]); //push operators
      }
    }

    if(currentNumber !==''){ //push number if current number is not empty
      token.push(currentNumber);
    }
    console.log(token);

  }

  const precedence = {
    '+':1,
    '-':1,
    '*':2,
    '/':2
  };

  const operators = ['+','-','*','/'];
  const isOperator = (item) => operators.includes(item);

  let output = [];
  function shuntingYard(token) { 
   
    let operatorStack = [];

    for (let i = 0; i < token.length; i++) {
      if (!isNaN(token[i])) {  // If the token is a number
        output.push(token[i]);
      } else if (isOperator(token[i])) {  // If the token is an operator
        while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token[i]]) {
          output.push(operatorStack.pop());  // Pop from operatorStack
        }
        operatorStack.push(token[i]);
      }
    }

    while (operatorStack.length) {
      output.push(operatorStack.pop());
    }
    //console.log(output)
    return output;

  }

  function evaluatePostfix(postfix){
    const stack = [];

    for(let i = 0; i < output.length;i++){
      if(!isNaN(postfix[i])){
        stack.push(parseFloat(postfix[i]))
      }else{
        const b = stack.pop();
        const a = stack.pop();
        switch (postfix[i]) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            stack.push(a / b);
            break;
      }
    }

  }
  return stack.pop();
  }

makeToken(screenValue);
let postfix = shuntingYard(token);
console.log('Postfix', postfix);

let result = evaluatePostfix(postfix);
console.log('Result:', result);

document.getElementById('screen').innerHTML = result;

});

