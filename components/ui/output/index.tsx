import styles from './styles.module.scss'

type ComponentProps = {
  operator: string
  prevValue: string
  value: string
}

export const Output = (props: ComponentProps) => {
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