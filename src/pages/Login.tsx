import { useEffect, useState } from "react"
import AuthForm from "../component/AuthForm/AuthForm"
import { useNavigate } from "react-router-dom";
import { type logInData } from "../interfaces";
import axios from "axios";
import { toast } from "react-toastify";


const inputs =
    [
        { label: "Email :", type: "email", placeholder: "Email", name: "email" }
        , { label: "Pasword :", type: "password", placeholder: "*******", name: "password" }
    ]
const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<logInData>({
        email: "",
        password: ""
    })
    const nav = useNavigate()
    useEffect(() => {
        if (data.email != '') {
            sendData()
        }
    }, [data])


    async function sendData() {
        setLoading(true)
        await axios.post("https://vica.website/api/login", data, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => {
                console.log(res)
                localStorage.setItem("token", `Bearer ${res.data.token}`)
                localStorage.setItem("UserName", `${res.data.user.user_name}`)
                localStorage.setItem("FirstName", `${res.data.user.first_name}`)
                localStorage.setItem("LastName", `${res.data.user.last_name}`)
                localStorage.setItem("image", `${res.data.user.profile_image_url}`)
                toast.success("You have logged in successfully")
            }).catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.msg);
                setLoading(false)

            })

        if (localStorage.getItem("token")) {
            nav("/dashbored/items")

        }
    }

    return (
        <>

            <AuthForm<logInData> width="434px" loading={loading} title="Sign In" descriptions="Please enter your email and password to continue" inputs={inputs} btn='Sign In' footer={{ content: "Don’t have an account?", links: { url: 'register', content: "Sign up" } }} setData={setData} />

        </>
    )
}

export default Login
