import { useEffect, useState } from 'react'
import styles from '../styles/components/Main.module.css'

import { RiPushpinFill, RiSunFill } from 'react-icons/ri'
import { api } from '../services/cryptoApi'
import { toast } from 'react-toastify'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { BiX } from 'react-icons/bi'

interface Coin {
  id: string,
  symbol: string,
  name: string,
  nameid: string,
  rank: number,
  price_usd: string,
  percent_change_24h: string,
  percent_change_1h: string,
  percent_change_7d: string,
  price_btc: string,
  market_cap_usd: string,
  volume24: number,
  volume24a: number,
  csupply: string,
  tsupply: string,
  msupply: string
}

export const Main = () => {
  const [coins, setCoins] = useState<Coin[]>([])
  const [pinnedCoins, setPinnedCoins] = useState<Coin[]>([
    {
      "id": "90",
      "symbol": "BTC",
      "name": "Bitcoin",
      "nameid": "bitcoin",
      "rank": 1,
      "price_usd": "6456.52",
      "percent_change_24h": "-1.47",
      "percent_change_1h": "0.05",
      "percent_change_7d": "-1.07",
      "price_btc": "1.00",
      "market_cap_usd": "111586042785.56",
      "volume24": 3997655362.9586277,
      "volume24a": 3657294860.710187,
      "csupply": "17282687.00",
      "tsupply": "17282687",
      "msupply": "21000000"
    }
  ])

  const [open, setOpen] = useState(false)
  const [coinDetails, setCoinDetails] = useState<Coin>()

  function handleClose() {
    setOpen(false)
  }

  async function loadCoins() {
    try {
      const response = await api.get('tickers/?limit=10')

      setCoins(response.data.data)
    } catch(err) {
      toast.error(`Erro ao carregar as moedas, tente novamente.`)
    }
  }

  async function loadPinnedCoins() {
    const pinnedCoins = localStorage.getItem('pinnedCoins')

    if (pinnedCoins === null) {
      setPinnedCoins([])
    } else {
      setPinnedCoins(JSON.parse(pinnedCoins))
    }
  }

  useEffect(() => {
    loadCoins()
  }, [])

  return (
    <div className={styles.mainContainer}>
      <section className={styles.pinnedCoins}>
        <span>
          <p>Fixados</p>
          <RiPushpinFill size={20} color="#00c9f6" />
        </span>
        {pinnedCoins === null || pinnedCoins.length === 0 ?
          <p>Sem itens fixados no momento ¯\_(ツ)_/¯</p> : 
          pinnedCoins.map(pinnedCoin => (
            <li className={styles.coinContainer}>
              <h2>{pinnedCoin.symbol}</h2>
              <p>{pinnedCoin.name}</p>
              <div className={styles.coinValue}>
                <h3>{String(Number(pinnedCoin.price_usd).toFixed(2))} USD</h3>
                {Math.sign(Number(pinnedCoin.percent_change_24h)) === -1 ? (
                  <h3 style={{ color: 'red' }}>{pinnedCoin.percent_change_24h}%</h3>
                ) : (
                  <h3 style={{ color: 'green' }}>+{String(Number(pinnedCoin.percent_change_24h).toFixed(2))}%</h3>
                )}
              </div>
            </li>
          ))
        }
      </section>
      <section className={styles.coinsList}>
        <span>
          <p>Principais de hoje</p>
          <RiSunFill size={20} color="#00c9f6" />
        </span>
        {coins.map(coin => (
          <li
            className={styles.coinContainer}
            onClick={() => {
              setCoinDetails(coin)
              setOpen(true)
            }}
          >
            <h2>{coin.symbol}</h2>
            <p>{coin.name}</p>
            <div className={styles.coinValue}>
              <h3>{String(Number(coin.price_usd).toFixed(2))} USD</h3>
              {Math.sign(Number(coin.percent_change_24h)) === -1 ? (
                <h3 style={{ color: 'red' }}>{coin.percent_change_24h}%</h3>
              ) : (
                <h3 style={{ color: 'green' }}>+{String(Number(coin.percent_change_24h).toFixed(2))}%</h3>
              )}
            </div>
          </li>
        ))}
      </section>
      <Dialog onClose={handleClose} open={open}>
        <div className={styles.modalContainer}>
          <header>
            <span>
              <h2>{coinDetails?.name}</h2>
              <p>{coinDetails?.symbol}</p>
            </span>
            <button onClick={handleClose}>
              <BiX size={30} />
            </button>
          </header>
          <div>
            <h3>1h: {coinDetails?.percent_change_1h}%</h3>
            <h3>24h: {coinDetails?.percent_change_24h}%</h3>
            <h3>7d: {coinDetails?.percent_change_7d}%</h3>
          </div>
        </div>
      </Dialog>
    </div>
  )
}