import { useEffect, useState } from 'react'
import styles from '../styles/components/Main.module.css'

import { RiPushpinFill, RiSunFill } from 'react-icons/ri'
import { api } from '../services/cryptoApi'
import { toast } from 'react-toastify'

interface Coin {
  id: string,
  symbol: string,
  name: string,
  nameid: string,
  rank: number,
  price_usd: number,
  percent_change_24h: number,
  percent_change_1h: number,
  percent_change_7d: number,
  price_btc: number,
  market_cap_usd: number,
  volume24: number,
  volume24a: number,
  csupply: number,
  tsupply: number,
  msupply: number
}

export const Main = () => {
  const [coins, setCoins] = useState<Coin[]>([])
  const [pinnedCoins, setPinnedCoins] = useState<Coin[]>([])

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
          <RiPushpinFill size={20} color="#657bf9" />
        </span>
        {pinnedCoins === null || pinnedCoins.length === 0 && <p>Sem itens fixados no momento ¯\_(ツ)_/¯</p>}
        {/* <li className={styles.pinnedContainer}>
          <h2>BTC</h2>
          <p>Bitcoin</p>
          <div className={styles.pinnedValue}>
            <h3>6465.26 USD</h3>
            <h3> -1,27%</h3>
          </div>
        </li> */}
      </section>
      <section className={styles.coinsList}>
        <span>
          <p>Principais de hoje</p>
          <RiSunFill size={20} color="#657bf9" />
        </span>
        {coins.map(coin => (
          <li className={styles.coinContainer}>
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
    </div>
  )
}