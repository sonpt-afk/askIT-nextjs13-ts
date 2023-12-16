import x from '@/styles/app.module.css';
import y from '@/styles/hoidanit.module.css';
import Link from 'next/link';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'HomePage',
  description: 'abcxyz',
}
 
export default function Home() {
  
  return (
    <div>
    <ul>
      <li className={x['red']}>
        <Link href={"/facebook"}>
        <span className={y['red']}>FACEBOOK</span>
         </Link></li>
         <li className={x['red']}><Link href={"/IG"}>
        <span className={y['red']}>IG</span>
         </Link></li>
         <li className={x['red']}><Link href={"/youtube"}>
        <span className={y['red']}>YOUTUBE</span>
         </Link>
         </li>
    </ul>
    </div>
  )
}
