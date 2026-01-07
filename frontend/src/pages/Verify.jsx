import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        const res = await axios.post(`${url}/api/order/verify`, { success, orderId})
        if (res.data.success) {
            navigate("/my-orders");
        } else {
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className='min-h-[60vh] grid'>
        <div className="w-37.5 h-37.5 place-self-center border-t-green-300 
        border-gray-300 border-2 rounded-[50%] animate-spin"></div>
    </div>
  )
}

export default Verify