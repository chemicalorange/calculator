import Head from 'next/head'
import styles from './styles.module.scss'

import { useState } from 'react'
import { Button } from 'components/ui/button'
import { Output } from 'components/ui/output'

import { buttonsData } from './data'

import cn from 'classnames'

const IndexPage = () => {
  console.log(buttonsData);
  
  const [value, setValue]: any = useState('0')
  const [prevValue, setPrevValue]: any = useState('')
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
    if (prevValue !== '') {
      return true
    }

    return false
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
        <div className={styles.keyboard}>
          { buttonsData.map((item, index) => {
            const {title, type} = item
            if(type === 'number') {
             return (<Button key={index} variant='default' onClick={() => addNumber(title)}>
                      {title}
                    </Button>)
            } else if (type === 'operator') {
              return (<Button key={index} variant='default' onClick={() => operationHandler(title)}>
                      {title}
                    </Button>)
            } else if (type === 'del') {
              return (<Button key={index} variant='colored' onClick={() => del()}>
                      {title}
                    </Button>)
            } else if (type === 'reset') {
              return (<Button key={index} variant='colored' onClick={() => reset()}>
                      {title}
                    </Button>)
            } else if (type === 'result') {
              return (<Button key={index} variant='accent' onClick={() => result()}>
                      {title}
                    </Button>)
            } else if (type === 'float') {
              return (<Button key={index} variant='default' onClick={() => float()}>
                      {title}
                    </Button>)
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default IndexPage
