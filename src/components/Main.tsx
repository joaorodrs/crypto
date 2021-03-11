import styles from '../styles/components/Main.module.css'

import { RiPushpinFill } from 'react-icons/ri'

export const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.pinnedCoins}>
        <span>
          <p>Fixados</p>
          <RiPushpinFill size={20} color="#657bf9" />
        </span>
        <div className={styles.pinnedContainer}>
          <h2>BTC</h2>
          <p>Bitcoin</p>
          <div className={styles.pinnedValue}>
            <h3>6465.26 USD</h3>
            <h3> -1,27%</h3>
          </div>
        </div>
        <div className={styles.pinnedContainer}>
          <h2>BTC</h2>
          <p>Bitcoin</p>
          <div className={styles.pinnedValue}>
            <h3>6465.26 USD</h3>
            <h3> -1,27%</h3>
          </div>
        </div>
        <div className={styles.pinnedContainer}>
          <h2>BTC</h2>
          <p>Bitcoin</p>
          <div className={styles.pinnedValue}>
            <h3>6465.26 USD</h3>
            <h3> -1,27%</h3>
          </div>
        </div>
      </div>
    </div>
  )
}