import 'firebase/auth'
import './styles/global.css'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { auth } from './config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      {user === null ? <SignIn auth={auth} /> : <Home auth={auth} />}
    </>
  )
}

export default App
