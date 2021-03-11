import 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { auth } from './config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'

function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      {user === null ? <SignIn auth={auth} /> : <Home auth={auth} />}
      <ToastContainer />
    </>
  )
}

export default App
