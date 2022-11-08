import Head from 'next/head'

import { useState } from 'react'

import { Output } from 'components/ui/output'
import { Keyboard } from 'components/common/keyboard'
import { Header } from 'components/ui/header'

import { addDot, deleteLastNumber, makeOperation } from 'utils'

import cn from 'classnames'

import styles from './styles.module.scss'

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
    setValue((prevState: string) => deleteLastNumber(prevState))
  }

  const operationHandler = (operation: string) => {
    setOperator(operation)
    if (isPrevValue()) {
      const result = makeOperation(prevValue, value, operation)
      setPrevValue(result)
    } else {
      setPrevValue(value)
    }
    setValue('0')
  }

  const getResult = () => {
    if (isPrevValue()) {
      const result = makeOperation(prevValue, value, operator)
      setValue(result)
      setPrevValue('')
      setOperator('')
    }
  }

  const isPrevValue = () => {
    return prevValue !== ''
  }

  const float = () => {
    setValue((prevValue:string) => addDot(prevValue))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(styles.wrapper, { dark: colorDarkTheme })}>
        <Header 
          isDark={colorDarkTheme}
          toggleDark={() => setDarkColorTheme((prev) => !prev)}
        />
        <Output operator={operator} prevValue={prevValue} value={value} />
        <Keyboard
          addNumber={addNumber}
          del={del}
          float={float}
          operationHandler={operationHandler}
          reset={reset}
          result={getResult}
        />
      </div>
    </div>
  )
}

export default IndexPage
