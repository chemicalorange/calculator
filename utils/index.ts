export const makeOperation = (prevValue: any, value: any, operator: string) => {
  if (value === '0' && operator === '/') {
    return 'Error'
  }

  switch (operator) {
    case '+':
      return +prevValue + +value
    case '/':
      return prevValue / +value
    case 'x':
      return +value * prevValue
    case '-':
      return +prevValue - +value
  }
}

export const deleteLastNumber = (numbers: string) => {
  numbers.toString()
  if (numbers.length < 2) {
    return '0'
  }

  let newNumbers = numbers.split('')
  newNumbers.pop()
  return newNumbers.join('')
}

export const addDot = (value: string) => {
  let newValue = value.split('')
  if (!newValue.includes('.')) {
    value += '.'
  }
  return value
}
