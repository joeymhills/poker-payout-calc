"use client"

import {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation';

export default function Home() {
  function createGame() {
    console.log("create game")
  }
  const [game, setGame] = useState('');
  const router = useRouter();
  return (
    <main className="pt-24 flex font-bentonreg min-h-screen flex-col items-center bg-darkgrey-700">
      <div className="text-[#fff]/90 shadow-xl pb-4 pt-4 mt-8 gap-5 rounded-lg flex flex-col w-96 justify-center items-center bg-[#fff]/10"> 
      <button className="border rounded-lg px-2 shadow-lg">
      Start a new game  
      </button>

      <form>
        <input className='text-[#000] bg-[#fff]/85 border rounded-lg shadow-lg px-1' 
        type="text" 
        placeholder='Game ID'
          onChange={(event) => {setGame(event.target.value)}}
        />
      </form>
      <button onClick={() => router.push(`/game/${game}`)} className="border rounded-lg px-2 shadow-lg">
      Join friends game  
      </button> 
      </div>
    </main>
  )
}
