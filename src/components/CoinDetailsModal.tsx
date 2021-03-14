import Dialog from '@material-ui/core/Dialog'
import { BiX } from 'react-icons/bi'
import { RiPushpinFill } from 'react-icons/ri'
import styles from '../styles/components/CoinDetailsModal.module.css'

interface CoinDetailsProps {
  onClose(): void,
  open: boolean,
  coin: Coin | undefined,
  onPin(): void,
  onUnpin(): void
}

export const CoinDetailsModal = ({ onClose, open, coin, onPin, onUnpin }: CoinDetailsProps) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <div className={styles.modalContainer}>
        <header>
          <span>
            <h2>{coin?.name}</h2>
            <p>{coin?.symbol}</p>
          </span>
          <button onClick={onClose}>
            <BiX size={30} />
          </button>
        </header>
        <div className={styles.coinInfo}>
          {Math.sign(Number(coin?.percent_change_1h)) === -1 ? (
            <h3 style={{ color: 'red' }}>1h: {coin?.percent_change_1h}%</h3>
          ) : (
            <h3 style={{ color: 'green' }}>1h: +{String(Number(coin?.percent_change_1h).toFixed(2))}%</h3>
          )}
          {Math.sign(Number(coin?.percent_change_24h)) === -1 ? (
            <h3 style={{ color: 'red' }}>24h: {coin?.percent_change_24h}%</h3>
          ) : (
            <h3 style={{ color: 'green' }}>24h: +{String(Number(coin?.percent_change_24h).toFixed(2))}%</h3>
          )}
          {Math.sign(Number(coin?.percent_change_7d)) === -1 ? (
            <h3 style={{ color: 'red' }}>7d: {coin?.percent_change_7d}%</h3>
          ) : (
            <h3 style={{ color: 'green' }}>7d: +{String(Number(coin?.percent_change_7d).toFixed(2))}%</h3>
          )}
        </div>
        <div className={styles.chartContainer}></div>
        {coin?.pinned ? (
          <button
          className={styles.pinCoinButton}
          onClick={onUnpin}
        >
          <RiPushpinFill size={20} color="var(--primary-color)" />
          Desfixar
        </button>
        ) : (
          <button
            className={styles.pinCoinButton}
            onClick={onPin}
          >
            <RiPushpinFill size={20} color="var(--primary-color)" />
            Fixar
          </button>
        )}
      </div>
    </Dialog>
  )
}