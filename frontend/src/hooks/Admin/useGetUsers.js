import { useEffect, useState } from "react";
import { useVariableContext } from "../../context/VariableContext";


const useGetUsers = () => {

    const { host, token } = useVariableContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const getUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${host}/admin/getusers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                  }

                const data = await response.json();

                setUsers(data.users);
                console.log(data.users);
                

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
            };
    
            getUsers();
        }, [host, token]);
    
        return { loading, error, users };
    };

export default useGetUsers;