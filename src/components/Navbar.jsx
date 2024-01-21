import React,{useState} from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import { FaSearch } from "react-icons/fa";
import { Link,NavLink,useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate ()
  const [query,setQuery] =useState("")
    const [isOpen, setOpen] = useState(false)
    const handleKeyPress = (e) => {
      if(e.keyCode == "13" && query!=""){
        navigate("/search/"+query);
      }
    }
  return (
    <>
    <div className="w-full h-[8vh] bg-transparent flex items-center justify-between md:fixed z-50 overflow-hidden backdrop-blur-sm"
    ><NavLink to="/" className="text-red-800 text-xl md:text-3xl font-extrabold ml-2" onClick={()=>setOpen(false)}>SnapFlix</NavLink>
    <div className="w-3/5 sm:w-2/5 h-[50%] md:h-4/5 border-2 border-gray-300 bg-transparent flex px-2 rounded-full py-4 items-center gap-2 md:gap-4 ">
      <div className="w-[10%] h-full  flex items-center justify-center">
      <FaSearch />
      </div>
    <input className="w-[90%] h-fit justify-self-end  text-lg md:text-xl bg-transparent active:border-0 active: outline-0" onChange={(e)=>setQuery(e.target.value)}  onKeyDown={(e) => handleKeyPress(e)}/>
    </div>
    <div className=" md:w-2/5 lg:w-1/5 w-fit justify-center text-right mr-2 hidden md:flex">
    <ul className="flex gap-4 font-bold" >
        <NavLink to="/discover/movie" onClick={()=>setOpen(false)}>Movie</NavLink>
        <Link to="/discover/tv" onClick={()=>setOpen(false)}>Series</Link>
    </ul>
    </div>
    <div className="w-fit aspect-square  md:hidden  relative z-40 right-0">
    <Hamburger toggled={isOpen} toggle={setOpen} />
    </div>
    </div>
    <div className={`w-screen mt-[8vh]  h-[92vh] absolute top-0 transition-all bg-[rgba(0,0,0,0.2)]  z-30  backdrop-blur-sm ${isOpen ? "left-0":"-left-full"} md:hidden block`}>
    <ul className="flex flex-col items-center justify-center gap-4 font-bold w-full h-full text-xl">
        <Link to="/discover/movie" onClick={()=>setOpen(false)}>Movie</Link>
        <Link to="/discover/tv" onClick={()=>setOpen(false)}>Series</Link>
    </ul>
    </div>
    </>
  )
}

export default Navbar