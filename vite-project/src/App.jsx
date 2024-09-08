import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/navbar'
import Home from './home/home'
import Cart from './cart/cart'
import Fotter from './components/nav/footer/fotter'
import Login from './login/login'
import Checkout from './checkout/checkout'
import Verify from './verify/verify'
import Userorder from './userorder/userorder'
import Search from './assets/search/search'
import Search_result from './assets/search/search_result'
import { StoreContext } from './context/store-cntxt'
function App() {
  const[showLog , setLog] = useState(false)
  const {showsearch , setShowsearch} = useContext(StoreContext)
  return (
    
    <>
      {showLog ? <Login setLog={setLog}/> : <></> }
      {showsearch ? <Search/> : <></>}
      <div className="app">

        <Navbar setLog = {setLog} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<Userorder/>} />
          <Route path='/search_result' element={<Search_result/>} />

        </Routes>
      </div>
      <Fotter />
    </>
  )
}

export default App
