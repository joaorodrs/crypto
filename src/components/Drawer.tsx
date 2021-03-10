import firebase from 'firebase/app'
import { BiBitcoin, BiLogOut, BiUser } from 'react-icons/bi'
import styles from '../styles/components/Drawer.module.css'

import cryptoImg from '../assets/crypto.png'

interface DrawerProps {
  showDrawer: boolean,
  onChangeComponent: (componentName: string) => void,
  auth: firebase.auth.Auth
}

export const Drawer = ({ showDrawer, onChangeComponent, auth }: DrawerProps) => {
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
      <button
        className={styles.drawerItem}
        onClick={() => onChangeComponent('Início')}
      >
        <BiBitcoin size={25} color="gray" />
        Início
      </button>
      <button
        className={styles.drawerItem}
        onClick={() => onChangeComponent('Perfil')}
      >
        <BiUser size={25} color="gray" />
        Perfil
      </button>
      <button
        className={styles.drawerItem}
        onClick={() => auth.signOut()}
      >
        <BiLogOut size={25} color="gray" />
        Sair
      </button>
    </aside>
  )
}