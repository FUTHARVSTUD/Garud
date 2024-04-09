"use client"
import AboutTeam from '@/components/AboutTeam'
import LiveStream from '@/components/LiveStream'
import MainDashboardHome from '@/components/MainDashboardHome'
import Sidebar from '@/components/Sidebar'
import { useLoginModalState } from '@/store/store'
import React from 'react'
import { Toaster } from 'react-hot-toast';

const index = () => {

  const whichSection = useLoginModalState((state) => state.whichSection)
  return (
    <div className='w-full min-h-screen flex overflow-hidden'>
        <Sidebar/>
        {
        whichSection === "home" ? <MainDashboardHome/> : 
        whichSection === "live-stream" ? <LiveStream/> :
        whichSection === "about-team" ? <AboutTeam/> : <>Page Not Found</>
        } 
        <Toaster />
    </div>
  )
}

export default index