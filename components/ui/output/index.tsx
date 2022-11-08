import styles from './styles.module.scss'

type OutputProps = {
  operator: string
  prevValue: string | number 
  value: string | number
}

export const Output = (props: OutputProps) => {
  const {operator, prevValue, value} = props 
  return (
    <div className={styles.output}>
        <div className={styles.row}>
          <div className={styles.operator}>
            {operator}
          </div>
          <div className={styles.prevValue}>
            {prevValue}
          </div>
        </div>
        <div className={styles.value}>
          {value}
        </div>
      </div>
  )
}