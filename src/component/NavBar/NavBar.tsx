
import { IoMdMoon, IoMdSunny } from "react-icons/io"
import type { navBarProps } from "../../interfaces"




const NavBar = ({ setMood, setSerach, mood }: navBarProps) => {

    return (
        <nav className="flex items-center justify-between py-[15px] px-[20px] dark:bg-[#202224] duration-1000 bg-white">
            <input
                type="text"
                onChange={(event) => setSerach(event.target.value)}
                className="border-2 border-black rounded-[8px] dark:border-white py-[5px] px-[10px] dark:text-white dark:placeholder:text-white"
                placeholder="Search a Product ...."
            />
            <div className="flex items-center gap-[30px]">
                <div className="flex justify-center items-center gap-4">
                    <img className="bg-center rounded-full w-[50px] h-[50px] " src={`${localStorage.getItem("image")}`} alt="" />
                    <div className="">
                        <p className="font-Nunito font-extrabold text-[20px] leading-[100%] text-[#202224] dark:text-white">{localStorage.getItem('UserName')}</p>
                        <p className="font-Nunito opacity-80 text-[14px] leading-[100%] text-[#202224] dark:text-white">{localStorage.getItem('FirstName')}{localStorage.getItem("LastName")}</p>
                    </div>

                </div>
                <span className="border-l-2 border-black border-solid dark:border-white cursor-pointer" onClick={() => setMood(prev => !prev)}>
                    {
                        mood ? (
                            <IoMdSunny className="text-yellow-400 ml-[15px] text-[22px]" />
                        ) : (
                            <IoMdMoon className="text-gray-800 ml-[15px] text-[22px] dark:text-white" />
                        )}
                </span >
            </div >
        </nav >
    )
}

export default NavBar

