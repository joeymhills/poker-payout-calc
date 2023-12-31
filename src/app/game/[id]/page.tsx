"use client"

import * as WebSocket from "websocket"
import {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Game({ params }: { params: { id: string } })  {

interface Player {
  id: number 
  name: string
  buyin: number 
  buyout: number
  net: number
}
interface Payment{
  paymentIndex: number 
  payer: Player
  amount: number
  reciever: Player
}
  const [incrementId, setIncrementId] = useState(0)

  const [link, setLink] = useState("")
  const [players, setPlayers] = useState<Player[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showDelete, setShowDelete] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [playerName, setPlayerName] = useState("");
  const [playerBuyin, setPlayerBuyin] = useState<number>(0);
  const [playerBuyout, setPlayerBuyout] = useState<number>(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("connecting to websocket")
    const socket = new WebSocket.w3cwebsocket(`ws://localhost:8080/ws/${params.id}`);
    
    const playerMsg = JSON.stringify(players)
    socket.onopen = function () {
      socket.send(playerMsg)
      socket.onmessage = (msg: any) => {
        console.log("message from websocket", msg);
      };
    };
  }, [players]);

  function getInfo() {
    fetch(`${link}/players_sessions`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        data.playersInfos.forEach((player: any) => {
          console.log("player", player);
          setPlayerName(player.names[0]);
          setPlayerBuyin(player.buyInSum);
          setPlayerBuyout(player.buyOutSum);
          createPlayer();
        });
      }); 
  }

  function createPlayer() {
    
    const netAmount = playerBuyin - playerBuyout

    const player: Player = {
      id: incrementId,
      name: playerName,
      buyin: playerBuyin,
      buyout: playerBuyout,
      net: netAmount 
    }
    setPlayers([...players, player])
    setIncrementId(incrementId + 1) 
  }
  
  function deletePlayer(id:number){
  setPlayers(players => players.filter((player)=> player.id != id ))
  }

 function calculatePayouts(playersarray: Player[]){
    var payers:Player[] = [];
    var recievers:Player[] = [];
    let total = 0  
   for (let i in playersarray) {
     total += playersarray[i].net
   }
   if (total != 0) {
     alert("The total buy-in and buy-out isn't equal, check your numbers silly!")
     return
   }
    for (let i in playersarray) {
     if(playersarray[i].net < 0 ){ 
       payers.push(playersarray[i])
      }
     else if(playersarray[i].net > 0 ){ 
       recievers.push(playersarray[i])
      }
     else {
     }
   }


    //create 2 arrays, one for payers and one for recievers

      console.log("players: ", playersarray)
    // Function that calculates the payouts
    const getPayouts = (payers: Player[], recievers: Player[]) => {
      let paymentsArray: Payment[] = []
      let paymentIndex = 0
      let payerIndex = 0
      let recieverIndex = 0
      let payer = payers[payerIndex]
      let reciever = recievers[recieverIndex]
      let amount = 0
      while (payer && reciever) {
        amount = Math.min(Math.abs(payer.net), Math.abs(reciever.net))
        
        const paymentObj: Payment = {
          paymentIndex: paymentIndex,
          payer: payer,
          amount: amount,
          reciever: reciever
        }
        console.log("payer:", paymentObj.payer.name)
        console.log("reciever:", paymentObj.reciever.name)
        console.log("paymentObj: ", paymentObj)
        paymentsArray.push(paymentObj)
        payer.net += amount
        reciever.net -= amount
        if (payer.net === 0) {
          payerIndex++
          payer = payers[payerIndex]
        }
        if (reciever.net === 0) {
          recieverIndex++
          reciever = recievers[recieverIndex]
        }
        paymentIndex++
      }
      console.log("payments: ", paymentsArray)
      setPayments(paymentsArray)
      return payments
    }
    getPayouts(payers, recievers)
      setShowResults(true)
    }
  
{/*This maps over our players array and renders a table*/}
  function table() {
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
      <button className='border rounded-lg px-2 shadow-lg' onClick={()=>{calculatePayouts(players)}}>Calculate payouts</button>
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
      <div className='z-30 rounded-lg mt-24 bg-darkgrey-700 w-96 h-96'>
       <div className='w-full flex flex-col '>
        <div className='w-full flex justify-center items-center '>
          <h1 className='font-bold text-2xl'>Payouts</h1>
        </div> 
        <div className='py-2'>{payments.map(paymentIndex => {
          return(
            <div className='flex flex-col'>
              <div className='flex justify-center items-center'>
                <div className=''>{paymentIndex.payer.name} pays ${paymentIndex.amount} to {paymentIndex.reciever.name}</div>
              </div>
            </div>
          )
        })}</div>
        <div className='w-full flex justify-center items-center '>
          <button className="w-16 h-8 rounded-lg border"onClick={()=>setShowResults(false)}>Close</button>
        </div>
       </div>
      </div>
    </div>
  </motion.div>
  )}
  </AnimatePresence>
  )
  }

  return (
    <main className="pt-24 flex font-bentonreg min-h-screen flex-col items-center bg-darkgrey-700">
      
      <div className="text-[#fff]/90 shadow-xl pt-4 mt-8 rounded-lg flex flex-col w-96 justify-center items-center bg-[#fff]/10"> 
      
      {payoutWindow()}
      {table()}

      <form className="flex pb-4 pt-8 justify-center items-center flex-col gap-2"
        onSubmit={(event) => {event.preventDefault();getInfo()}}>
        
        <h1 className=''>Enter game link</h1>
        <div className='flex justify-center items-center flex-col gap-1'> 
          <input className='text-[#000] bg-[#fff]/85 border rounded-lg shadow-lg px-1' 
          type="text" 
          placeholder='Link'
          onChange={(event) => {setLink(event.target.value)}}
        />
        </div>
        
        <button className="p-1 border rounded-lg shadow-lg" type="submit">
         Submit</button>
        </form>
      </div>
    </main>
  )
}
