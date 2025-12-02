import React from 'react'
import Header from './components/fixedC/Header'
import Landing from './components/Landing/landing'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Cta from './components/Cta'
import Footer from './components/fixedC/Footer'

export default function page() {
  return (
    <div className=''>
      <Header />
      <main className=''>
        <Landing />
        <Features />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
