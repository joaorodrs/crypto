import { useEffect, useState } from 'react'
import 'firebase/auth'

import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { auth } from './config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer } from 'react-toastify'
import Loader from 'react-loader-spinner'

function App() {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(true)

  console.log(user?.email)

  useEffect(() => {
    if (user !== undefined) setLoading(false)
  }, [user])

  return (
    <>
      {loading ? (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Loader
            type="Audio"
            color="#ff5043"
            height={70}
            width={70}
          />
        </div>
      ) : user === undefined ? <SignIn auth={auth} /> : <Home auth={auth} />}
      <ToastContainer />
    </>
  )
}

export default App
