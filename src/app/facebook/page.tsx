'use client'
import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
const FB =()=> {
    const router = useRouter()
    const handleBtn=()=>{
        router.push('/')
    }

  return (
    <div>
      FB page
      <div>
      <Button variant='success'>Hoi Dan IT</Button>

        <button onClick={()=> handleBtn()}>Back Home</button>
      </div>
    </div>
  )
}

export default FB
