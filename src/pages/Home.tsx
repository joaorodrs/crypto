import { useState } from "react"
import firebase from 'firebase/app'
import { BiMenu, BiBitcoin, BiUser, BiLogOut } from "react-icons/bi"
import { AiFillGithub } from 'react-icons/ai'
import { Drawer } from "../components/Drawer"

import styles from '../styles/pages/Home.module.css'

import cryptoImg from '../assets/crypto.png'
import { Main } from "../components/Main"
import { Profile } from "../components/Profile"

interface HomeProps {
  auth: firebase.auth.Auth
}

export const Home = ({ auth }: HomeProps) => {
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
      <Drawer
        showDrawer={showDrawer}
        onChangeComponent={toggleComponent}
        auth={auth}
      />
      <header
        className={styles.header}
        style={{
          background: showDrawer ? '#00c9f615' : 'white'
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
              background: activeComponent === 'Início' ? "#00c9f615" : 'white'
            }}
          >
            <BiBitcoin
              size={25}
              color={activeComponent === 'Início' ? "#FF5043" : 'gray'}
            />
            <h3>Início</h3>
          </button>
          <button
            className={styles.drawerItem}
            onClick={() => toggleComponent('Perfil')}
            style={{
              background: activeComponent === 'Perfil' ? "#00c9f615" : 'white'
            }}
          >
            <BiUser
              size={25}
              color={activeComponent === 'Perfil' ? "#FF5043" : 'gray'}
            />
            <h3>Perfil</h3>
          </button>
          <button
            className={styles.drawerItem}
            onClick={() => auth.signOut()}
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
            color={showDrawer ? '#FF5043' : 'black'}
          />
        </a>
      </header>
      <main
        onClick={() => setShowDrawer(false)}
        className={styles.main}
        style={{
          background: showDrawer ? '#eee' : 'white',
        }}
      >
        <div style={{
          opacity: showDrawer ? 0.2 : 1,
          transition: '.3s ease'
        }}>
          {activeComponent === 'Início' && <Main />}
          {activeComponent === 'Perfil' && <Profile userInfo={auth.currentUser} />}
        </div>
      </main>
    </div>
  )
}