import React from 'react'
import Charity from './media/charity.jpg'
import Hands from './media/hands.svg'
import Navbar from './navbar'
import { Link } from 'react-router-dom'
import About from './about'
import handsWater from './media/handsWater.svg'
import handsHeart from './media/handsHeart.svg'
import heart from './media/heart.svg'
import people from './media/people.svg'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="h-screen w-screen flex flex-col align-center justify-center">
    <div className="w-full h-[90%] flex sm:flex-col  lg:flex-row">
        <div className="lg:w-6/12 w-full h-full flex-wrap lg:h-full bg-[#5DACBD] shrink flex flex-col justify-center align-center">  
        <h1 className="font-Climate flex-wrap text-[42px] md:text-[60px] md:w-[551px] ml-[40px] p-1 leading-[45px] md:leading-[80px] md:ml-[90px] text-start text-[#E0EBEB]">
        Think of <br></br>giving not as <br></br> a duty, but as <br></br>a privilege</h1>
        <h4 className="font-Space  flex-wrap leading-[26px] ml-[50px] md:ml-[90px] mt-5 text-start text-[#E0EBEB] font-bold">
        A charity donation decentralized application built on <br></br>fantom blockchain.</h4>
        <Link to="/donate" className="w-32 bg-[#24527A] items-center justify-center flex hover:bg-sky-700 h-14 ml-[50px] md:ml-[90px] mt-5 ">
            <h1 className="font-Kanit text-[#E0EBEB] font-bold ">Donate</h1>
        </Link>
        </div>
        <div className="lg:w-6/12 w-[0px] h-[0px] lg:h-full bg-[#5DACBD] flex flex-col">
            {/* <div className="h-[10%] w-full space-x-32 mr-32 flex items-center justify-center text-[#24527A] font-Kanit font-bold">
            <h1>About us</h1>
            <h1>Donate</h1>
            <h1>Fantom</h1>
            </div> */}
            <div className="h-full w-full flex flex-col justify-end items-start">
                <img className="lg:w-[582px] w-[0px] h-[0px] lg:h-[690px] rounded-tr-2xl mr-10 object-fill" src={Hands} alt="charity" />
            </div>
        </div>
    </div>
    <div className="w-full h-[10%] bg-[#24527A] flex p-2 space-x-10 md:space-x-32 lg:space-x-80 shrink items-center justify-center">
        <img className='w-auto h-[80%]' src={handsWater} alt=''/>
        <img className='w-auto h-[80%] ' src={handsHeart} alt=''/>
        <img className='w-auto h-[80%] ' src={heart} alt=''/>
        <img className='w-auto h-[80%] ' src={people} alt=''/>
    </div>
    </div>
    <About/>
    </>
  )
}

export default Home