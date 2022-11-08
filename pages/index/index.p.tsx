import Head from 'next/head'
import styles from './styles.module.scss'

import { useState } from 'react'
import { Output } from 'components/ui/output'

import cn from 'classnames'
import { Keyboard } from 'components/common/keyboard'

const IndexPage = () => {
  
  const [value, setValue] = useState<any>('0')
  const [prevValue, setPrevValue] = useState<any>('')
  const [operator, setOperator] = useState('')
  const [colorDarkTheme, setDarkColorTheme] = useState(false)

  const addNumber = (number: string) => {
    setValue((prevState: string) => {
      let newState: number | string = prevState + number
      newState = +newState
      return newState.toString()
    })
  }

  const reset = () => {
    setValue('0')
    setPrevValue('')
    setOperator('')
  }

  const del = () => {
    if (value === '0') {
      setPrevValue('')
      setOperator('')
    }

    setValue((prevState: string) => {
      if (prevState.length < 2) {
        return '0'
      }

      let newState = prevState.split('')
      newState.pop()
      return newState.join('')
    })
  }

  const operationHandler = (operation: string) => {
    setOperator(operation)
    if (isPrevValue()) {
      makeOperation()
    } else {
      setPrevValue(value)
      setValue('0')
    }
  }

  const result = () => {
    if (isPrevValue()) {
      makeOperation()
      setValue(eval(`${prevValue} ${operator} ${value}`).toString())
      setPrevValue('')
      setOperator('')
    }
  }

  const makeOperation = () => {
    switch (operator) {
      case '+':
        setPrevValue(+prevValue + +value)
        break
      case '/':
        setPrevValue(prevValue / +value)
        break
      case 'x':
        setPrevValue(+value * prevValue)
        break
      case '-':
        setPrevValue(+prevValue - +value)
        break
    }
    setValue('0')
  }

  const isPrevValue = () => {
    return prevValue !== ''
  }

  const float = () => {
    let newValue = value.split('')
    if (!newValue.includes('.')) {
      setValue((prevState: string) => prevState + '.')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chemicalculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(styles.wrapper, { dark: colorDarkTheme })}>
        <div className={styles.header}>
          <span className={styles.title}>Calc</span>
          <div className={styles.themeContainer}>
            <span>Theme</span>
            <div
              className={cn(styles.theme, { [styles.checked]: colorDarkTheme })}
              onClick={() => setDarkColorTheme((prev) => !prev)}
            >
              <span></span>
            </div>
          </div>
        </div>
        <Output operator={operator} prevValue={prevValue} value={value} />
        <Keyboard
          addNumber={addNumber}
          del={del}
          float={float}
          operationHandler={operationHandler}
          reset={reset}
          result={result}
        />
      </div>
    </div>
  )
}

export default IndexPage
