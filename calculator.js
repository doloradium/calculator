let screen = document.querySelector('.screen')
let button = document.querySelectorAll('.buttons__item')
let equals = document.getElementById('equals')
let plus = document.getElementById('plus')
let minus = document.getElementById('minus')
let divide = document.getElementById('divide')
let multiply = document.getElementById('multiply')
let leftBracket = document.getElementById('leftBracket')
let rightBracket = document.getElementById('rightBracket')
let square = document.getElementById('square')
let squareRoot = document.getElementById('squareRoot')
let remove = document.getElementById('remove')
let deleteAll = document.getElementById('delete')
let index
let memory = []
let resultString = ''
let innerArray = []
let resultArray = []
let position
let splicedArray
let output
let bracketIndex
let input1

/*
- в качестве второго операнда нельзя использовать отрицательное число
- отсутствует работа со скобками
- отсутствует возведение в квадрат
- отсутствует извлечение квадратного корня из числа
*/

equals.addEventListener('click', function() {
    resultString = screen.textContent
    for (let i = 0; i < resultString.length; i++) {
        if (resultString.includes('(')) {
            resultString = brackets(resultString)
        }
    }
    screen.textContent = Math.round(calculations(resultString) * 100) / 100
    if (screen.textContent == 'NaN' || screen.textContent == 'Infinity') {
        screen.textContent = 'Error'
    }
    memory = []
    resultString = []
    resultArray = []
})

brackets = (input) => {
    console.log(input)
    if (input.includes('(')) {
        bracketIndex = input.length - input.split('').reverse().join('').indexOf(')') - 1
        splicedArray = input.slice(input.indexOf('(') + 1, bracketIndex)
        input = input.replace('(' + splicedArray + ')', calculations(splicedArray))
    }
    console.log(input)
    if (typeof input !== typeof 'string') {
        input = calculations(input)
    }
    return input
}

calculations = (input) => {
    if (input.includes('(')) {
        input = brackets(input)
    }
    innerArray = input.split('+').join(',').split('−').join(',').split('×').join(',').split('÷').join(',').split(',')
    for (let i = 0; i < input.length; i++) {
        // if (resultString.charAt(i) == '+' && resultString.charAt(Number(i) + 1) == '−') {
        //     memory.push('pn')
        //     resultString = resultString.replace('+−', '')
        //     resultArray.splice(i, 1)
        // }
        // if (resultString.charAt(i) == '−' && resultString.charAt(Number(i) + 1) == '−') {
        //     memory.push('min')
        //     resultString = resultString.replace('−−', '')
        //     resultArray.splice(i, 1)
        // }
        // if (resultString.charAt(i) == '÷' && resultString.charAt(Number(i) + 1) == '−') {
        //     memory.push('dn')
        //     resultString = resultString.replace('÷−', '')
        //     resultArray.splice(i, 1)
        // }
        // if (resultString.charAt(i) == '×' && resultString.charAt(Number(i) + 1) == '−') {
        //     memory.push('mun')
        //     resultString = resultString.replace('×−', '')
        //     resultArray.splice(i, 1)
        // }
        if (input.charAt(i) == '+') {
            memory.push('+')
        }
        if (input.charAt(i) == '−') {
            memory.push('−')
        }
        if (input.charAt(i) == '÷') {
            memory.push('÷')
        }
        if (input.charAt(i) == '×') {
            memory.push('×')
        }
    }
    let memoryLength = memory.length
    for (let i = 0; i < memoryLength; i++) {
        // index = memory.indexOf('pn')
        // if (index >= 0) {
        //     resultArray[index] = +resultArray[index] - +resultArray[index + 1]
        //     console.log(resultArray)
        //     console.log(memory)
        //     resultArray.splice(index + 1, 1)
        //     memory.splice(index, 1)
        //     console.log(resultArray)
        //     console.log(memory)
        // }
        // index = memory.indexOf('min')
        // if (index >= 0) {
        //     resultArray[index] = +resultArray[index] + +resultArray[index + 1]
        //     resultArray.splice(index + 1, 1)
        //     memory.splice(index, 1)
        // }
        // index = memory.indexOf('dn')
        // if (index >= 0) {
        //     resultArray[index] = +resultArray[index] / (-1 * resultArray[index + 1])
        //     resultArray.splice(index + 1, 1)
        //     memory.splice(index, 1)
        // }
        // index = memory.indexOf('mun')
        // if (index >= 0) {
        //     resultArray[index] = +resultArray[index] * (-1 * resultArray[index + 1])
        //     resultArray.splice(index + 1, 1)
        //     memory.splice(index, 1)
        // }
        index = memory.indexOf('÷')
        if (index >= 0) {
            innerArray[index] /= innerArray[index + 1]
            innerArray.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('×')
        if (index >= 0) {
            innerArray[index] *= innerArray[index + 1]
            innerArray.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('−')
        if (index >= 0) {
            innerArray[index] -= innerArray[index + 1]
            innerArray.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('+')
        if (index >= 0) {
            innerArray[index] = +innerArray[index] + +innerArray[index + 1]
            innerArray.splice(index + 1, 1)
            memory.splice(index, 1)
        }
    }
    return innerArray[0]
}

Array.prototype.forEach.call(button, function(e) {
    e.addEventListener('click', function() {
        if (e.textContent !== '=') {
            screen.textContent += e.textContent
        }
    })
})

remove.addEventListener('click', function() {
    screen.textContent = screen.textContent.slice(0, -2)
})

deleteAll.addEventListener('click', function() {
    memory = []
    resultString = []
    screen.textContent = ''
})