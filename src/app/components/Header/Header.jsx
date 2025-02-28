import React from 'react'
import ConnectButton from '../ConnectButton/ConnectButton'
import Link from 'next/link'

const Header = () => {
  return (
    <nav className='flex justify-between items-center py-2 px-5'>
      <div className="text-lg">Voting System</div>
      <ConnectButton/>
    </nav>
  )
}

export default Header
