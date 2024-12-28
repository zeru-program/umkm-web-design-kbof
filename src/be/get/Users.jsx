import React, { useEffect, useState } from 'react'

const Users = () => {
    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_DB}users.json`)
        .then((res) => res.json())
        .then((data) => {
            setDataUsers(Object.entries(data).map(([key, value]) => ({ key, ...value })))
        })
    }, [])
    return { dataUsers, setDataUsers }
}

export default Users