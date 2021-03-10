import { useState } from 'react'
import { BiBitcoin } from 'react-icons/bi'
import styles from '../styles/components/Drawer.module.css'

interface DrawerProps {
  showDrawer: boolean
}

export const Drawer = ({ showDrawer }: DrawerProps) => {
  return (
    <nav
      className={styles.nav}
      style={{
        maxWidth: showDrawer ? '50%' : 0
      }}
    >
      <a href="" className={styles.navItem}>
        <BiBitcoin size={25} color="gray" />
        Início
      </a>
    </nav>
  )
}