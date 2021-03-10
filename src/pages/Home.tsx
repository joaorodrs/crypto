import { useState } from "react"
import { BiMenu } from "react-icons/bi"
import { AiFillGithub } from 'react-icons/ai'
import { Drawer } from "../components/Drawer"

import styles from '../styles/pages/Home.module.css'

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
        <h2>{activeComponent}</h2>
        <a
          href="https://github.com/joaorodrs/crypto"
          target="_blank"
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
        Something in the body
      </main>
    </div>
  )
}