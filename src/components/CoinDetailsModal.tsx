import Dialog from '@material-ui/core/Dialog'
import { BiX } from 'react-icons/bi'
import styles from '../styles/components/CoinDetailsModal.module.css'

interface CoinDetailsProps {
  onClose(): void,
  open: boolean,
  coin: Coin | undefined
}

export const CoinDetailsModal = ({ onClose, open, coin }: CoinDetailsProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
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
        <div>
          <h3>1h: {coin?.percent_change_1h}%</h3>
          <h3>24h: {coin?.percent_change_24h}%</h3>
          <h3>7d: {coin?.percent_change_7d}%</h3>
        </div>
      </div>
    </Dialog>
  )
}