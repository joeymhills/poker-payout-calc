import pokerChip from '../assets/pokerchip.svg'
import Image from 'next/image'
export default function Appbar() {  
return (
    <div className="fixed top-0 left-0 bg-[#fff]/10 font-primary text-[#fff]/90 h-16 w-full flex flex-row justify-center items-center text-4xl">
    {/*<Image className='fixed top-3 left-3' alt="" height={40} width={40} src={pokerChip} />*/}
      <h1 className='pt-2'>Payout Calculator</h1>
    </div>

      )
}
