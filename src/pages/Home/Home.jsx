import React from 'react'
import { useUserAuth } from '../../context/useUserContext'
import Header from '../../component/Header';

const Home = () => {
    const { user } = useUserAuth();
    console.log(user)
    return (
        <div>
            <Header user={user}></Header>
        </div>
    )
}

export default Home
