import axios from "axios";
import {  NavLink, useNavigate } from "react-router-dom";
import type { sideBarProps } from "../../interfaces";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Popup from "../Popup/Popup";





const SideBar = ({ title, contents, btn }: sideBarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const nav = useNavigate()
    const openPopUp = () => {
        setIsOpen(true)
    }
    const closePopUp = () => {
        setIsOpen(false)
    }
    async function logOut() {
        await axios.post("https://vica.website/api/logout", {}, {
            headers: {
                "AUTHORIZATION": localStorage.getItem("token"),
                "Accept": "application/json"
            }
        }).then(res => {
            console.log(res.data)
            localStorage.clear()
            toast.success("user logged out")
        }
        ).catch(err => {
            console.log(err)
            toast.error("An error occurred while logging out.")
        })

        nav("/")
    }
    return (
        <>
            <div className=" flex items-center justify-between flex-col w-[230px] py-[16px] h-screen  dark:bg-[#202224] duration-1000">
                <div className="">
                    <h1 className="font-Nunito font-extrabold text-[20px] leading-[100%] text-[#4880FF] grow mb-[50px]">{title.part1}<span className="text-[#202224] dark:text-white">{title.part2}</span></h1>
                    <ul className="flex flex-col gap-5">
                        {
                            contents.map((content, index) => {
                                return (
                                    <li key={index}><NavLink className={({ isActive }) => `flex items-center justify-center gap-4 font-Nunito font-semibold text-[14px] w-[130px] rounded-2xl h-[50px] leading-[100%] ${isActive ? 'bg-[#4880FF] text-white' : 'text-[#202224] dark:text-white'}`} to={content.to}> {content.img} {content.description}</NavLink></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button onClick={openPopUp} className=" bg-[#002c6d] py-[10px] px-[10px] rounded-[12px] cursor-pointer flex justify-center items-center gap-2 w-[130px] h-[50px] font-Nunito font-semibold text-[14px] leading-[100%] text-white ">{btn.image}{btn.content}</button>
                {
                    isOpen && <Popup description="Are you sure you want to logout" yes={logOut} no={closePopUp} />
                }
            </div>
            <ToastContainer className="top-0 right-0" />
        </>
    )
}

export default SideBar
