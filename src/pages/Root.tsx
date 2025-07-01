import { Outlet } from "react-router-dom"
import NavBar from "../component/NavBar/NavBar"
import SideBar from "../component/SideBar/SideBar"
import { useState } from "react"
import { SearchContext } from "../context/Context"
import { CiPower } from "react-icons/ci"
import { AiOutlineProduct } from "react-icons/ai"
import { MdFavoriteBorder } from "react-icons/md"
import { GoListUnordered } from "react-icons/go"
import { ToastContainer } from "react-toastify"

const content = [{ img: <AiOutlineProduct className="text-[21px]" />, description: "Products", to: "/dashbored/items" }, { img: <MdFavoriteBorder className="text-[21px]" />, description: "Favorites", to: "/dashbored/favorits" }, { img: <GoListUnordered className="text-[21px]" />, description: "Order List", to: "/dashbored/orderlist" }]


const Root = () => {
    const [mood, setMood] = useState<boolean>(false)
    const [serach, setSerach] = useState("")
    return (
        <>

            <div className={`${mood && "dark"} flex  justify-between `}>
                <SearchContext.Provider value={serach}>
                    <SideBar title={{ part1: "Dash", part2: "Stack" }} btn={{ image: <CiPower className="font-Nunito font-semibold text-[22px] leading-[100%] text-white" />, content: " LogOut" }} contents={content} />
                    <div className="w-full dark:bg-[#44484c] bg-[#e6e3e3]  max-h-screen overflow-scroll " style={{ scrollbarWidth: "none" }} >
                        <NavBar image="/public/assets/img/Profile_Image.png" mood={mood} setMood={setMood} setSerach={setSerach} />
                        <div className=" p-8 " >
                            <Outlet />
                        </div>
                    </div>

                </SearchContext.Provider>
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default Root
