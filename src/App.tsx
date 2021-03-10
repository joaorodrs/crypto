import firebase from 'firebase/app'
import 'firebase/auth'
import './styles/global.css'

import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { firebaseConfig } from './config/firebase'

function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          if (isSignedIn) {
            return <Home />
          } else {
            return <SignIn />
          }
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  )
}

export default App
