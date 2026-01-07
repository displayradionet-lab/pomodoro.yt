import React from 'react'
import headerImg from "../assets/header_img.jpg"

const Header = () => {
  return (
    <div className='h-[30vw] my-10 mx-auto relative bg-no-repeat bg-cover'
     style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="absolute flex flex-col items-start gap-2 max-w-[50%] 
        bottom-[25%] left-6 ">
        <h2 className="text-xl md:text-3xl  lg:text-4xl font-semibold  text-violet-800 fade-in">
            Ordina i tuoi piatti preferiti
        </h2>
        <p className="hidden lg:block md:text-md md:block lg:text-xl text-violet-600 fade-in">
          Scegli dal menu i piatti che ti piacciono con ingredienti sempre
          freschi, sani e genuini. <br /> La nostra missione e' soddisfare il
          tuo palato con deliziose pietanze di qualita'.
        </p>
        <a href="#explore-menu"
        className=" py-[0.5vw] px-[2vw] text-xs  lg:block bg-orange-500  rounded-md 
           hover:bg-violet-400 hover:text-white cursor-pointer scrollable-container"
        >
            Vedi il menu
        </a>
      </div>
    </div>
  )
}

export default Header