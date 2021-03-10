import { useState } from "react"
import { BiMenu } from "react-icons/bi"
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
    <div className={styles.homeContainer}>
      <Drawer showDrawer={showDrawer} onChangeComponent={toggleComponent} />
      <header className={styles.header}>
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className={styles.menuButton}
        >
          <BiMenu size={35} />
        </button>
        <h2>{activeComponent}</h2>
      </header>
      <main
        onClick={() => setShowDrawer(false)}
        className={styles.main}
      >
        Something in the body
      </main>
    </div>
  )
}