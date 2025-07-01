import { useEffect, useState } from "react"
import AuthForm from "../component/AuthForm/AuthForm"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { signUpData } from "../interfaces";
import { toast } from "react-toastify";
import Profile_Image from "../assets/img/Profile_Image.png"
const inputs =
    [
        { label: "First Name", type: "text", placeholder: "First Name", name: "first_name" },
        { label: "Last Name", type: "text", placeholder: "Last Name", name: "last_name" },
        { label: "User Name", type: "text", placeholder: "User Name", name: "user_name" },
        { label: "Email", type: "email", placeholder: "Email", name: "email" },
        { label: "Pasword", type: "password", placeholder: "*******", name: "password" },
        { label: "Password Confirmation", type: "password", placeholder: "*******", name: "password_confirmation" },
        { label: Profile_Image, type: "file", name: " profile_image" },
    ]



const Register = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<signUpData>({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        profile_image: null
    })
    const nav = useNavigate()

    useEffect(() => {
        if (data.email != "") {
            sendData()
        }
    }, [data])

    async function sendData() {
        setLoading(true)
        await axios.post("https://vica.website/api/register", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            }
        }).then(res => {
            console.log(res.data)
            localStorage.setItem("token", `Bearer ${res.data.data.token}`)
            localStorage.setItem("UserName", `${res.data.data.user.user_name}`)
            localStorage.setItem("FirstName", `${res.data.data.user.first_name}`)
            localStorage.setItem("LastName", `${res.data.data.user.last_name}`)
            localStorage.setItem("image", `${res.data.data.user.profile_image_url}`)
            toast.success("User is created successfully.")
        }
        ).catch(err => {
            console.log(err)
            toast.error(err.response.data.message)

        })
        if (localStorage.getItem('token')) {
            nav("/")
            setLoading(false)
        }
    }

    return (

        <>
            <AuthForm<signUpData> width="207px" title="Sign Up" descriptions="Create a account to continue" loading={loading} inputs={inputs} footer={{ content: "Already have an account?   ", links: { url: "/", content: "Sign In" } }} btn="Sign Up" setData={setData} />
        </>

    )
}

export default Register
