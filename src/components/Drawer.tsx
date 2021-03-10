import { BiBitcoin, BiUser } from 'react-icons/bi'
import styles from '../styles/components/Drawer.module.css'

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
    </aside>
  )
}