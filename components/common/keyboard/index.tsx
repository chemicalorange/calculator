import { Button } from "components/ui/button"
import { buttonsData } from "./data"

import styles from './styles.module.scss'

type TKeyboard = {
  addNumber: Function
  operationHandler: Function
  del: Function
  reset: Function
  result: Function
  float: Function
}

export const Keyboard:React.FC<TKeyboard> = ({addNumber, operationHandler, del, reset, result, float}) => {
  return (
    <div className={styles.keyboard}>
          { buttonsData.map((item, index) => {
            const {title, type} = item
            switch (type) {
              case 'number':
                return (<Button key={index} variant='default' onClick={() => addNumber(title)}>
                          {title}
                        </Button>)
              case 'operator': 
                return (<Button key={index} variant='default' onClick={() => operationHandler(title)}>
                          {title}
                        </Button>)
              case 'del':
                return (<Button key={index} variant='colored' onClick={() => del()}>
                          {title}
                        </Button>)
              case 'reset':
                return (<Button key={index} variant='colored' onClick={() => reset()}>
                          {title}
                        </Button>)
              case 'result':
                return (<Button key={index} variant='accent' onClick={() => result()}>
                          {title}
                        </Button>)
              case 'float': 
                return (<Button key={index} variant='default' onClick={() => float()}>
                          {title}
                        </Button>)
            }
          })}
        </div>
  )
}