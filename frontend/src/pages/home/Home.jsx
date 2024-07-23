import React from 'react'

import MainLayout from '../../layouts/MainLayout'
import Hero from './components/Hero'
import Blogs from './components/Blogs'
import CTA from './components/CTA'

const Home = () => {
    return (
        <MainLayout>
            <Hero />
            <Blogs />
            <CTA />
        </MainLayout>
    )
}

export default Home