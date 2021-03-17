import { useEffect, useState } from 'react'
import styles from '../styles/components/Main.module.css'

import { RiPushpinFill, RiSunFill } from 'react-icons/ri'
import { api } from '../services/cryptoApi'
import { toast } from 'react-toastify'
import Loader from 'react-loader-spinner'

import { CoinDetailsModal } from '../components/CoinDetailsModal'

export const Main = () => {
  const [coins, setCoins] = useState<Coin[]>([])
  const [pinnedCoins, setPinnedCoins] = useState<Coin[]>()

  const [open, setOpen] = useState(false)
  const [coinDetails, setCoinDetails] = useState<Coin>()

  const [loading, setLoading] = useState(true)

  function handleClose() {
    setOpen(false)
  }

  async function loadCoins() {
    try {
      const limit = '10'

      const response = await api.get(`tickers/?limit=${limit}`)

      setCoins(response.data.data)
    } catch(err) {
      toast.error(`Erro ao carregar as moedas, tente novamente.`)
    }
  }

  function handlePin(action: 'PIN' | 'UNPIN') {
    const coinToPinOrUnpin = coinDetails
    const pinnedCoins = localStorage.getItem('pinnedCoins')

    if (action === 'PIN') {
      if (pinnedCoins === null) {
        localStorage.setItem('pinnedCoins', JSON.stringify([coinToPinOrUnpin]))
      } else {
        const parsedPinnedCoins  = JSON.parse(pinnedCoins)

        localStorage.setItem('pinnedCoins', JSON.stringify([...parsedPinnedCoins, coinToPinOrUnpin]))
      }
    } else {
      const parsedPinnedCoins: Coin[]  = JSON.parse(String(pinnedCoins))

      delete coinToPinOrUnpin?.pinned

      const updatedPinnedCoins = parsedPinnedCoins.filter(coin => {
        return coin.id !== coinToPinOrUnpin?.id
      })

      localStorage.setItem('pinnedCoins', JSON.stringify(updatedPinnedCoins))
    }

    setOpen(false)
    loadPinnedCoins()
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
    (async () => {
      await loadCoins()

      await loadPinnedCoins()

      setLoading(false)
    })()
  }, [])

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loader
            type="Audio"
            color="var(--secondary-color)"
            height={70}
            width={70}
          />
        </div>
      ) : (
        <>
          <section className={styles.pinnedCoins}>
            <span>
              <p>Fixados</p>
              <RiPushpinFill size={20} color="var(--primary-color)" />
            </span>
            {pinnedCoins === null || pinnedCoins?.length === 0 ?
              <p>Sem itens fixados no momento ¯\_(ツ)_/¯</p> : 
              pinnedCoins?.map(pinnedCoin => (
                <li
                  key={pinnedCoin.id} 
                  className={styles.coinContainer}
                  onClick={() => {
                    setCoinDetails({...pinnedCoin, pinned: true})
                    setOpen(true)
                  }}
                >
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
              <RiSunFill size={20} color="var(--primary-color)" />
            </span>
            {coins.map(coin => (
              <li
                key={coin.id}
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
          <CoinDetailsModal
            onClose={handleClose}
            open={open}
            coin={coinDetails}
            onPin={() => handlePin('PIN')}
            onUnpin={() => handlePin('UNPIN')}
          />
        </>
      )}
    </div>
  )
}