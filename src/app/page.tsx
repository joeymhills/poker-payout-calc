"use client"

import {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {

interface Player {
  id: number
  name: string
  buyin: number 
  buyout: number
}
  const [incrementId, setIncrementId] = useState(0)
  const [players, setPlayers] = useState<Player[]>([]);
  const [showDelete, setShowDelete] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [playerName, setPlayerName] = useState("");
  const [playerBuyin, setPlayerBuyin] = useState<number>(0);
  const [playerBuyout, setPlayerBuyout] = useState<number>(0);

 
  function createPlayer() {
    const player: Player = {
      id: incrementId,
      name: playerName,
      buyin: playerBuyin,
      buyout: playerBuyout
    }
    setPlayers([...players, player])
    setIncrementId(incrementId + 1) 
  }
  
  function deletePlayer(id:number){
  setPlayers(players => players.filter((player)=> player.id != id ))
  }

  function calculatePayouts(){
    for (let i in players) {
    console.log(players[i].buyout - players[i].buyin)
    setShowResults(true)
    }
  }
  
{/*This maps over our players array and renders a table*/}
  function table() {
    console.log("table rendered")
    return(
   <div className=''>
    <table className="text-black table-fixed">
      <thead className='border-b'>
        <tr>
          <th className='text-left w-20'>Player</th>
          <th className='text-left w-20'>Buy-in</th>
          <th className='text-left w-20'>Buy-out</th>
          {showDelete && (<th className='text-left w-20'></th>)}
        </tr>
      </thead>
      <tbody>
    
      {players?.map( id =>
        <tr>
          <td>{id.name}</td>
          <td>{id.buyin}</td>
          <td>{id.buyout}</td>
          {showDelete && (<td><button onClick={()=>deletePlayer(id.id)}>Delete</button></td>)}
        </tr>
      )}
      </tbody>
    </table>
    <div className='flex flex-col gap-2 pt-8 items-center justify-center'>
      <button className='border rounded-lg px-2 shadow-lg' onClick={()=>setShowDelete(!showDelete)}>Delete players</button>
      <button className='border rounded-lg px-2 shadow-lg' onClick={()=>calculatePayouts()}>Calculate payouts</button>
    </div>
  </div>
  )}

{/*This is a popup that displays our results after payouts are calculated*/}
  function payoutWindow(){
  return(
 <AnimatePresence> 
  {showResults && (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
    <div className='z-20 top-0 left-0 bg-[#000]/50 fixed w-screen min-h-screen flex flex-col items-center'>
      <div className='z-30 rounded-lg mt-24 bg-[#fff] w-96 h-96'>
       <div className='w-full flex flex-col '> 
        <div>results</div>
        <button className="w-16 h-8 rounded-lg border"onClick={()=>setShowResults(false)}>Close</button>
       </div>
      </div>
    </div>
  </motion.div>
  )}
  </AnimatePresence>
  )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#35654d] to-[#000]">
      
      <div className="text-black shadow-xl pt-4 mt-8 rounded-lg flex flex-col w-96 justify-center items-center bg-[#fff]"> 
      
      {payoutWindow()}
      {table()}

      <form className="flex pb-4 pt-8 justify-center items-center flex-col gap-2"
        onSubmit={(event) => {event.preventDefault();createPlayer()}}>
        
        <h1 className='font-bold'>Add player</h1>
        <div className='flex justify-center items-center flex-col gap-1'> 
        <h1 className=''>Name</h1>
          <input className='border rounded-lg shadow-lg px-1' 
          type="text" 
          onChange={(event) => {setPlayerName(event.target.value)}}
        />
        </div>
        <div className='flex justify-center items-center flex-col gap-1'> 
        <h1 className=''>Buy-in</h1>
        <input className='border rounded-lg shadow-lg px-1' 
          type="number"
          onChange={(event) => {setPlayerBuyin(Number(event.target.value))}}
        />
        </div>
        <div className='flex justify-center items-center flex-col gap-1'> 
        <h1 className=''>Buy-out</h1>
        <input className='border rounded-lg shadow-lg px-1' 
          type="number" 
          onChange={(event) => {setPlayerBuyout(Number(event.target.value))}}
        />
        </div>
        
        <button className="p-1 border rounded-lg shadow-lg" type="submit">
         Create player</button>
        </form>
      </div>
    </main>
  )
}
