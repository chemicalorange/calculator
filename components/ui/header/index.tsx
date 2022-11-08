import cn from 'classnames'

import styles from './styles.module.scss'

type HeaderProps = {
  isDark: boolean,
  toggleDark: Function
}

export const Header:React.FC<HeaderProps> = ({isDark, toggleDark}) => {
  return (
    <div className={styles.header}>
          <span className={styles.title}>Calc</span>
          <div className={styles.themeContainer}>
            <span>Theme</span>
            <div
              className={cn(styles.theme, { [styles.checked]: isDark })}
              onClick={() => toggleDark()}
            >
              <span></span>
            </div>
          </div>
        </div>
  )
}