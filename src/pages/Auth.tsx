import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import authBackGround from "../assets/img/auth-bg.png"
const Auth = () => {
    const nav = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            nav("/dashbored/items")
        }
    }, [nav])

    return (
        <div className="h-screen w-screen bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url(${authBackGround})` }}>
            <Outlet />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>

    )
}

export default Auth
