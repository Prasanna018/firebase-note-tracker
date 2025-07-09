import React from 'react'
import { useUserAuth } from '../../context/useUserContext'
import Header from '../../component/Header';
import HeroSection from '../../component/HeroSection ';
import NotesTrackerFeatures from '../../component/Features';
import InfiniteScrollTestimonials from '../../component/FeedBack';
import Footer from '../../component/Footer';

const Home = () => {
    const { user } = useUserAuth();
    console.log(user)
    return (
        <div>
            <Header user={user}></Header>
            <HeroSection></HeroSection>
            <NotesTrackerFeatures></NotesTrackerFeatures>
            <InfiniteScrollTestimonials></InfiniteScrollTestimonials>
            <Footer></Footer>
        </div>
    )
}

export default Home
