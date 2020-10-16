let stack=[];     
let operators = ['+', '-','*','/','sqrt','undo', 'clear',' '];
let tempFirst;

const isFloat = (n) =>n === +n && n !== (n|0);

const doOperation  = (optr,a,b,position) => {
    console.log('A',a,b)
    switch (optr) {
        case '+':
            isFloat(a) || isFloat(b) ? Number(a+b).toPrecision(15) : Number(a+b);
            return Number(a+b);
        case '-':
         return  isFloat(a) || isFloat(b) ? Number(a-b).toPrecision(15) : Number(a-b);
        case '*':
            return  isFloat(a) || isFloat(b) ? Number(a*b).toPrecision(15) : Number(a*b);
        case '/':
            return Number(a/b).toPrecision(15);
        case 'sqrt':
            return Math.sqrt(a).toPrecision(15);
        case 'undo':
            return '';     
        case 'clear':
            return ''; 
        case 'number':
            return [a,b]
        default:
            return `operator ${optr} (position: <${position}>): insufficient parameters`
    }
}

const checkOperator = (operator) => {
    
    if (/\d{1,}/.test(parseInt(operator))) {
        return 'number';
    } else if (operator.includes(operator)) {
        return 'valid'
    }
    return 'other';
}

process.stdin.on('data', data =>  {
    
    let result;
    let [operator,OperandOne,OperandTwo,...rest] = data.toString().trim().split(' ').reverse();
    const [prevOperandOne,prevOperandTwo,...prevRest] = stack.reverse();
    const getposition = data.toString().length - 2;
    const isValidOperator = checkOperator(operator);

    if (isValidOperator == 'number') {
        tempFirst = operator;
        operator= isValidOperator;
    }
    if (isValidOperator  && operator == 'undo') {}

    if  (isValidOperator  && operator == 'clear'){
        prevRest.length = 0;
        rest.length = 0
    } 
    else {

     result = isValidOperator ? doOperation(operator,parseFloat(OperandOne||prevOperandOne) ,parseFloat(OperandTwo||prevOperandTwo||prevOperandOne||0),getposition)      
               : `operator ${operator} (position: <${getposition}>): insufficient parameters`;
    }
    
    const remaining  = rest.length > 0 ? rest: prevRest;    
    const newStack = isValidOperator == 'number' ? [tempFirst]:[...remaining.reverse(),result]
    stack = newStack;
    //output
    console.log(`stack : ${newStack.join(' ')}`);
})


