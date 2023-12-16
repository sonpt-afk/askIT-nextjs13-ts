'use client'
import x from '@/styles/app.module.css';
import y from '@/styles/hoidanit.module.css';
import Link from 'next/link';
import AppTable from '@/components/app.table';
import { useEffect } from 'react';
import useSWR from "swr";

export default function Home() {
  const fetcher = (url:string) => fetch(url)
  .then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
   { revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false}
  );

  if(!data){
    return <div>loading...</div>
  }
  return (
    <div>
      {data?.length}
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
    <AppTable blogs={data?.sort((a:any,b:any) => b.id - a.id)}/>
    </div>
  )
}
