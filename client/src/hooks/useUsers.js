import { useEffect, useState } from 'react';
import instance from '../axios/globalInstance'

const useUsers = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await instance.get('/users')
            setData(data.data)
            setLoading(false)
        }

        getData()
    }, [])

    return { data, loading }
}

export default useUsers