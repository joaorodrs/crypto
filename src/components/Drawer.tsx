import { BiBitcoin, BiLogOut, BiUser } from 'react-icons/bi'
import styles from '../styles/components/Drawer.module.css'

import cryptoImg from '../assets/crypto.png'

interface DrawerProps {
  showDrawer: boolean,
  onChangeComponent: (componentName: string) => void
}

export const Drawer = ({ showDrawer, onChangeComponent }: DrawerProps) => {
  return (
    <aside
      className={styles.drawerContainer}
      style={{
        marginLeft: !showDrawer ? '-50%' : 0
      }}
    >
      <div className={styles.logoWrapper}>
        <img
          src={cryptoImg}
          alt="Crypto"
        />
      </div>
      <a
        className={styles.drawerItem}
        onClick={() => onChangeComponent('Início')}
      >
        <BiBitcoin size={25} color="gray" />
        Início
      </a>
      <a
        className={styles.drawerItem}
        onClick={() => onChangeComponent('Perfil')}
      >
        <BiUser size={25} color="gray" />
        Perfil
      </a>
      <a
        className={styles.drawerItem}
        onClick={() => alert('Logged out')}
      >
        <BiLogOut size={25} color="gray" />
        Sair
      </a>
    </aside>
  )
}