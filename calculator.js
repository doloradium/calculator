let screen = document.querySelector('.screen')
let button = document.querySelectorAll('.buttons__item')
let equals = document.getElementById('equals')
let square = document.getElementById('square')
let plus = document.getElementById('plus')
let minus = document.getElementById('minus')
let divide = document.getElementById('divide')
let multiply = document.getElementById('multiply')
let squareRoot = document.getElementById('squareRoot')
let remove = document.getElementById('remove')
let deleteAll = document.getElementById('delete')
let dot = document.getElementById('dot')
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

squareRoot.addEventListener('click', function () {
    resultString = equals(resultString)
    screen.textContent = Math.round(Math.sqrt(resultString) * 100) / 100
    if (screen.textContent == 'NaN' || screen.textContent == 'Infinity') {
        screen.textContent = 'Error'
    }
    memory = []
    resultString = []
    resultArray = []
})

equals.addEventListener('click', function () {
    resultString = equals(resultString)
    screen.textContent = Math.round(resultString * 100) / 100
    if (screen.textContent == 'NaN' || screen.textContent == 'Infinity') {
        screen.textContent = 'Error'
    }
    memory = []
    resultString = []
    resultArray = []
})

equals = (input) => {
    input = screen.textContent

    for (let i = 0; i < input.length; i++) {
        if (input.includes('(')) {
            input = brackets(input)
        }
    }
    // return input
    input = calculations(input)
    return input
}

brackets = (input) => {
    if (input.includes('(')) {
        if (input.indexOf(')', input.indexOf('(') + 1) < input.indexOf('(', input.indexOf('(') + 1)) {
            splicedArray = input.slice(input.indexOf('(') + 1, input.indexOf(')'))
            input = input.replace('(' + splicedArray + ')', calculations(splicedArray))
        }
        if (input.indexOf(')', input.indexOf('(') + 1) > input.indexOf('(', input.indexOf('(') + 1)) {
            bracketIndex = input.length - input.split('').reverse().join('').indexOf(')') - 1
            splicedArray = input.slice(input.indexOf('(') + 1, bracketIndex)
            input = input.replace('(' + splicedArray + ')', calculations(splicedArray))
        }
    }
    if (typeof input !== typeof 'string') {
        input = calculations(input)
    }
    return input
}

calculations = (input) => {
    if (input.includes('(')) {
        input = brackets(input)
    }

    innerArray = input.split('+').join(',').split('???').join(',').split('??').join(',').split('??').join(',').split(',')
    for (let i = 0; i < input.length; i++) {
        for (let i = 0; i < innerArray.length; i++) {
            if (innerArray[i].indexOf('??') != -1) {
                innerArray[i] = innerArray[i].replace('??', '')
            }
        }
        if (input.charAt(i) == '??') {
            memory.push('??')
        }
        if (input.charAt(i) == '+') {
            memory.push('+')
        }
        if (input.charAt(i) == '???') {
            memory.push('???')
        }
        if (input.charAt(i) == '??') {
            memory.push('??')
        }
        if (input.charAt(i) == '??') {
            memory.push('??')
        }
    }
    let memoryLength = memory.length
    for (let i = 0; i < memoryLength; i++) {
        for (let i = 0; i < innerArray.length; i++) {
            index = memory.indexOf('??')
            if (memory.includes('??') == true) {
                innerArray[index] *= innerArray[index]
                memory.splice(index, 1)
            }
        }
        for (let i = 0; i < innerArray.length; i++) {
            index = memory.indexOf('??')
            if (memory.includes('??') == true) {
                innerArray[index] /= innerArray[index + 1]
                innerArray.splice(index + 1, 1)
                memory.splice(index, 1)
            }
        }
        for (let i = 0; i < innerArray.length; i++) {
            index = memory.indexOf('??')
            if (memory.includes('??') == true) {
                innerArray[index] *= innerArray[index + 1]
                innerArray.splice(index + 1, 1)
                memory.splice(index, 1)
            }
        }
        index = memory.indexOf('???')
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

Array.prototype.forEach.call(button, function (e) {
    e.addEventListener('click', function () {
        if (e.textContent == '=' || e.textContent == '???') { }
        else if (screen.textContent == 'Error' && e.textContent == '.') screen.textContent = '0' + e.textContent
        else if (screen.textContent == '' && e.textContent == '.') screen.textContent = '0' + e.textContent
        else if (screen.textContent == 'Error') screen.textContent = '' + e.textContent
        else screen.textContent += e.textContent
    })
})

plus.addEventListener('click', function () {
    onlyOne('+', '???', '??', '??', '.')
})

minus.addEventListener('click', function () {
    onlyOne('???', '??', '??', '+', '.')
})

divide.addEventListener('click', function () {
    onlyOne('??', '??', '???', '+', '.')
})

multiply.addEventListener('click', function () {
    onlyOne('??', '???', '+', '??', '.')
})

dot.addEventListener('click', function () {
    onlyOne('.', '??', '???', '+', '??')
})

onlyOne = (main, side1, side2, side3, side4) => {
    if (screen.textContent.charAt(screen.textContent.length - 2) == main && screen.textContent.charAt(screen.textContent.length - 1) == main) {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1)
    }
    if (screen.textContent.charAt(screen.textContent.length - 2) == side1 && screen.textContent.charAt(screen.textContent.length - 1) == main) {
        screen.textContent = screen.textContent.slice(0, Number(screen.textContent.length) - 2) + main
    }
    if (screen.textContent.charAt(screen.textContent.length - 2) == side2 && screen.textContent.charAt(screen.textContent.length - 1) == main) {
        screen.textContent = screen.textContent.slice(0, Number(screen.textContent.length) - 2) + main
    }
    if (screen.textContent.charAt(screen.textContent.length - 2) == side3 && screen.textContent.charAt(screen.textContent.length - 1) == main) {
        screen.textContent = screen.textContent.slice(0, Number(screen.textContent.length) - 2) + main
    }
    if (screen.textContent.charAt(screen.textContent.length - 2) == side4 && screen.textContent.charAt(screen.textContent.length - 1) == main) {
        screen.textContent = screen.textContent.slice(0, Number(screen.textContent.length) - 2) + main
    }
}

square.addEventListener('click', function () {
    screen.textContent = screen.textContent.slice(0, -2) + '??'
})

remove.addEventListener('click', function () {
    screen.textContent = screen.textContent.slice(0, -2)
})

deleteAll.addEventListener('click', function () {
    memory = []
    resultString = []
    screen.textContent = ''
})