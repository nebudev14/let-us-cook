import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='flex items-center justify-center flex-col text-3xl'>
      <button>Sign In</button>
    </div>
  )
}

export default Home
