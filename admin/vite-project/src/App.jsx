import { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Route , Routes } from 'react-router-dom'
import Order from './pages/orders/order'
import List from './pages/list/list'
import Add from './pages/add/add'
import Home from './pages/home/home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/> */}
    <hr />
    <div className="app-cnt">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<Add/>} />
          <Route path='/orders' element={<Order/>} />
          <Route path='/list' element={<List/>} />

        </Routes>
    </div>
    </>
  )
}

export default App
