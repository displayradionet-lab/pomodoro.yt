import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='flex flex-col items-center p-25 justify-center' id='app-download'>
        <p className="flex text-center text-xl">
            Per migliorare l'esperienza Download
        </p>
        <span className='text-orange-500 text-2xl font-semibold'>
            Pomodoro Ristorante
        </span>
        <span className='bg-teal-600 text-white p-2 my-2 text-center rounded'>
            Scarica la tua App
        </span>
        <div className="flex gap-4">
            <a target='_blank' href="https://play.google.com">
                <img src={assets.play_store} alt="" />
            </a>
            <a target='_blank' href="https://apple.com">
                <img src={assets.app_store} alt="" />
            </a>
        </div>
    </div>
  )
}

export default AppDownload