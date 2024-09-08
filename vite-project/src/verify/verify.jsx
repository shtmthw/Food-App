import axios from 'axios'
import React, { useEffect } from 'react'
import { Await, useNavigate, useSearchParams } from 'react-router-dom'


function Verify() {
    const [srchprama, setSrchparam] = useSearchParams()
    const success = srchprama.get('success')
    const orderId = srchprama.get('orderId')
    const navigate = useNavigate()

    const check_payment = async () => {
        const resp = await axios.post('http://localhost:5000/api/odr/verify', { orderId, success })
        if (resp.data.success) {
            window.alert("Order Confirmed!")
            navigate('/myorders')
        }   
        else {
            window.alert("Order NOT Confirmed!")
            navigate('/')
    
        }
    }

    useEffect(() => {
        check_payment()
    }, [])

    return (
        <div>
            <p>This is the verify page, wait for a popup</p>
        </div>
    )
}

export default Verify