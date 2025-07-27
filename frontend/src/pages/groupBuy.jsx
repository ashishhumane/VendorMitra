import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import CreateGroupBuyPage from '../components/form'

const groupBuy = () => {
    return (
        <div className='bg-orange-50 h-screen w-full'>
            <Navbar />
            <CreateGroupBuyPage />
        </div>
    )
}

export default groupBuy
