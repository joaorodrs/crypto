import firebase from 'firebase/app'
import styles from '../styles/pages/SignIn.module.css'

import { useAuthState } from 'react-firebase-hooks/auth'

import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'

import cryptoImg from '../assets/crypto.png'

interface SignInProps {
  auth: firebase.auth.Auth,
}

export const SignIn = ({ auth }: SignInProps) => {
  const [user] = useAuthState(auth)

  async function handleSignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    await auth.signInWithPopup(provider)
  }

  function handleSignInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()

    auth.signInWithPopup(provider)
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.imageWrapper}>
        <img src={cryptoImg} alt=""/>
      </div>
      <div>
        <button
          className={styles.signInMethodButton}
          onClick={handleSignInWithGoogle}
        >
          Continuar com
          <FcGoogle size={23} />
        </button>
        <button
          className={styles.signInMethodButton}
          onClick={handleSignInWithFacebook}
        >
          Continuar com
          <SiFacebook size={23} color="#1674EA" />
        </button>
      </div>
    </div>
  )
}