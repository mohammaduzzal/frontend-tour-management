import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

export default function Verify() {
  const location = useLocation()
  const [email] = useState(location.state)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!email){
      navigate("/")
    }
  },[email])
  console.log(location.state)
  return (
    <div>Verify</div>
  )
}
