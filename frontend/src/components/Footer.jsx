import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div
      className="flex flex-col gap-16 text-[#d9d9d9] bg-[#323232] items-center 
    py-16 px-8 mt-10" id='contattaci'
    >
      <div className="w-full grid lg:grid-cols-[2fr_1fr_1fr] gap-10">
        <div className="-mt-3">
          <a className="" href="/">      
              <div className="mb-6 w-full">
          <p className="flex flex-col text-red-500 italic -mt-3 font-bold text-3xl">Pomodoro
            <span className="text-green-600 -mt-2">Ristorante</span>
            </p>
            <div className=" text-green-500 border-2 mt-1 w-40 "></div>
        </div>
          </a>
          <p className="hidden mb-7">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />{' '}
            Unde fugit reiciendis recusandae, excepturi aut modi.
          </p>
          <div className="flex gap-4 w-40  ">
           <a target='_blank' href="https://facebook.com"> <img src={assets.facebook_icon} alt="" /></a>
           <a target='_blank' href="https://X.com"><img src={assets.twitter_icon} alt="" /></a> 
           <a target='_blank' href="https://linkedin.com"> <img src={assets.linkedin_icon} alt="" /></a>
          </div>
        </div>
        <div className="flex flex-col item-start">
          <h2 className="text-2xl font-semibold mb-5 text-orange-500">
            Pomodoro Ristorante
          </h2>
          <ul className='cursor-pointer'>
            <a
              className="hover:underline hover:text-orange-500 hover:font-semibold"
              href="/"
            >
              Home
            </a>
            <li className="hover:underline hover:text-orange-500 hover:font-semibold">
              Chi siamo
            </li>
            <li className="hover:underline hover:text-orange-500 hover:font-semibold">
              Delivery
            </li>
            <li className="hover:underline hover:text-orange-500 hover:font-semibold">
              Regole
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-orange-500">
            Contattaci
          </h2>
          <li>+39 012 345 6789</li>
          <li>pomodoro.ristorante@test.com</li>
        </div>
      </div>
      <hr className='h-1 w-full bg-violet-600 border-none'/>
      <p className="text-[#d9d9d9]">
        Copyright © 2023 Pomodoro Ristorante. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
