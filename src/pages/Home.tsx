import { useState } from "react"
import { BiMenu, BiBitcoin, BiUser, BiLogOut } from "react-icons/bi"
import { AiFillGithub } from 'react-icons/ai'
import { Drawer } from "../components/Drawer"

import styles from '../styles/pages/Home.module.css'

import cryptoImg from '../assets/crypto.png'

export const Home = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [activeComponent, setActiveComponent] = useState('Início')

  function toggleComponent(componentName: string) {
    setShowDrawer(false)

    setActiveComponent(componentName)
  }

  return (
    <div
      className={styles.homeContainer}
    >
      <Drawer showDrawer={showDrawer} onChangeComponent={toggleComponent} />
      <header
        className={styles.header}
        style={{
          background: showDrawer ? '#657bf936' : 'white'
        }}
      >
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className={styles.menuButton}
        >
          <BiMenu size={35} />
        </button>
        <div className={styles.logoWrapper}>
          <img
            src={cryptoImg}
            alt="Crypto"
          />
        </div>
        <h2>{activeComponent}</h2>
        <nav>
          <button
            className={styles.drawerItem}
            onClick={() => toggleComponent('Início')}
            style={{
              background: activeComponent === 'Início' ? "#657bf936" : 'white'
            }}
          >
            <BiBitcoin
              size={25}
              color={activeComponent === 'Início' ? "#657bf9" : 'gray'}
            />
            <h3>Início</h3>
          </button>
          <button
            className={styles.drawerItem}
            onClick={() => toggleComponent('Perfil')}
            style={{
              background: activeComponent === 'Perfil' ? "#657bf936" : 'white'
            }}
          >
            <BiUser
              size={25}
              color={activeComponent === 'Perfil' ? "#657bf9" : 'gray'}
            />
            <h3>Perfil</h3>
          </button>
          <button
            className={styles.drawerItem}
            onClick={() => alert('Logged out')}
          >
            <BiLogOut size={25} color="#f44" />
          </button>
        </nav>
        <a
          href="https://github.com/joaorodrs/crypto"
          target="_blank"
          rel="noreferrer"
          className={styles.gitHubButton}
        >
          <AiFillGithub
            size={35}
            color={showDrawer ? '#657bf9' : 'black'}
          />
        </a>
      </header>
      <main
        onClick={() => setShowDrawer(false)}
        className={styles.main}
        style={{
          background: showDrawer ? '#ddd' : 'white'
        }}
      >
        {activeComponent}
      </main>
    </div>
  )
}