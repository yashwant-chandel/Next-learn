import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log(process.env.MONGODB_PATH);
  return (
    <>home page</>
  )
}
