import React from 'react'
import { useEffect, useState } from "react";
import abiJSON from './contract/ABI.json'



const Donate = () => {
    const ethers = require("ethers");   
 const [walletAddress, setWalletAddress] = useState("");
 const contractAddress = '0x80Ad7D8eaf3C623E6fC4670036e1C87204C4D5F1';
 const [number, setNumber] = useState([])
 const [donation, setDonation] = useState('')

 useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    // getDonation();
  }, [walletAddress]);

  useEffect(() => {
    getDonation();
  }, [donation]);
    


  
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };


  //const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const signer = provider.getSigner();




    const donateTo = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(contractAddress, abiJSON.abi, signer)
        const amount = ethers.utils.parseUnits(number, 'ether')
        let transaction = await contract.donateToGeneralWallet({value: amount})
        await transaction.wait()
    }

        
    
      const getDonation = async () => {
        try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(contractAddress, abiJSON.abi, signer)
        let transaction = await contract.getTotalDonations()
        const ends =transaction.toString()
        const WeiToEther = ethers.utils.formatEther(ends)
        setDonation(WeiToEther)
        }
        catch (e) {
            console.error(e);
        }
        // console.log('work ?', WeiToEther)
        console.log('donation', donation)
    }
    


    return (
        <div className='w-full h-screen flex flex-col'>
        <div className=' w-full h-24 bg-[#24527A] flex items-center'>
       <div className='w-[20%]'>
       <a href="/"> <h2 className="text-2xl font-bold font-Kanit text-[#E0EBEB] ">l.o.ld</h2>
                        </a>
       </div>
       <div className='w-[80%] flex justify-end'>
       <button className='w-auto h-12 p-[5px] text-white font-bold font-Kanit bg-blue-400 mr-8 rounded-md' onClick={connectWallet}><span>
        {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`: "Connect Wallet"}
        </span></button>
       </div>
        </div>
        <div className='w-full bg-[#E0EBEB] h-5/6 flex flex-col items-center justify-center'>
        <h1 className='font-Space font-bold text-teal-700'>Total donated amount {donation} FTM</h1>
        <label className="block mb-2 text-lg font-medium text-[#24527A] font-Kanit font-bold">Enter amount to donate</label>
        <input type="number" id="default-input" onChange={(e) => setNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] md:w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        <div className=" w-[60%] md:w-2/5 justify-end flex mt-10">
        <button  onClick={donateTo} className="w-28 h-10 p-[5px] text-white font-bold font-Kanit bg-blue-400 ml-62 rounded-md">Donate</button>
        </div>
        </div>
        <div className='flex bg-[#24527A] h-[10%] w-full flex-col items-center justify-center text-white font-Kanit'>
        Copyright &copy; {new Date().getFullYear()} Life on land 
        </div>
        </div>
    )
}

export default Donate