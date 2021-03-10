import firebase from 'firebase/app'
import styles from '../styles/components/Profile.module.css'

interface ProfileProps {
  userInfo: firebase.User | null
}

export const Profile = ({ userInfo }: ProfileProps) => {
  return (
    <div className={styles.profileContainer}>
      <img
        src={String(userInfo?.photoURL)}
        alt={String(userInfo?.displayName)}
      />
      <div className={styles.userInfoWrapper}>
        <h3>{userInfo?.displayName}</h3>
        <p>{userInfo?.email}</p>
      </div>
      <div className={styles.userData}></div>
    </div>
  )
}