
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContProv from './context/store-cntxt.jsx'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StoreContProv>
      <App />
    </StoreContProv>
  </BrowserRouter>

)
