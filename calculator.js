let screen = document.querySelector('.screen')
let button = document.querySelectorAll('.buttons__item')
let equals = document.getElementById('equals')
let plus = document.getElementById('plus')
let minus = document.getElementById('minus')
let divide = document.getElementById('divide')
let multiply = document.getElementById('multiply')
let index
let memory = []
let resultString = '0'

plus.addEventListener('click', function() {
    memory.push('+')
})

minus.addEventListener('click', function() {
    memory.push('-')
})

divide.addEventListener('click', function() {
    memory.push('/')
})

multiply.addEventListener('click', function() {
    memory.push('*')
})

equals.addEventListener('click', function() {
    resultString = screen.textContent.split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',')
    let memoryLength = memory.length
    for (let i = 0; i < memoryLength; i++) {
        index = memory.indexOf('/')
        if (index >= 0) {
            resultString[index] /= resultString[index + 1]
            resultString.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('*')
        if (index >= 0) {
            resultString[index] *= resultString[index + 1]
            resultString.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('-')
        if (index >= 0) {
            resultString[index] -= resultString[index + 1]
            resultString.splice(index + 1, 1)
            memory.splice(index, 1)
        }
        index = memory.indexOf('+')
        if (index >= 0) {
            resultString[index] = +resultString[index] + +resultString[index + 1]
            resultString.splice(index + 1, 1)
            memory.splice(index, 1)
        }
    }
    console.log(memory)
    memory = []
    screen.textContent = Math.floor(Number(resultString[0] * 100)) / 100
    screen.textContent = resultString[0]
})

Array.prototype.forEach.call(button, function(e) {
    e.addEventListener('click', function() {
        if (e.textContent !== '=') {
            screen.textContent += e.textContent
        }
    });
});