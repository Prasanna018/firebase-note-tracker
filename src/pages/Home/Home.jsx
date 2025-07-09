import React from 'react'
import { useUserAuth } from '../../context/useUserContext'
import Header from '../../component/Header';
import HeroSection from '../../component/HeroSection ';

const Home = () => {
    const { user } = useUserAuth();
    console.log(user)
    return (
        <div>
            <Header user={user}></Header>
            <HeroSection></HeroSection>
        </div>
    )
}

export default Home
