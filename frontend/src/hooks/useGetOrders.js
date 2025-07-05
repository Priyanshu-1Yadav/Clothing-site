import { useState, useEffect } from 'react';
import { useVariableContext } from '../context/VariableContext';

const useGetOrders = ()=>{
    const {host, token} = useVariableContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        // console.log('Fetching orders...');

        const getOrders = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const response = await fetch(`${host}/order/getorders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            // console.log(data);
            
            setOrders(data.Orders);

          } catch (err) {

            setError(err.message);

          } finally {

            setLoading(false);
          }
        };
    
        if (token) {
          getOrders();
        }
      }, []);
    
      return { loading, error, orders };

    };

    export default useGetOrders;