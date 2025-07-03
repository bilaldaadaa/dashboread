import { useEffect, useState } from "react"
import AddEditForm from "../component/AddEditForm/AddEditForm"

import axios from "axios"
import type { dataAdd } from "../interfaces"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Add = () => {
    const [loading, setLoding] = useState<boolean>(false)
    const [data, setData] = useState<dataAdd>({
        name: "",
        price: "",
        image: null
    })
    const nav = useNavigate()
    useEffect(() => {
        if (data.image != null && data.name != "" && data.price != '') {
            setLoding(true)
            axios.post("https://vica.website/api/items", data, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {

                toast.success(res.data.message)
                nav("/dashbored/items")
                setLoding(false)
            }).catch(err => {

                toast.success(err.data.message)
            })
        }

    }, [data])

    return (
        <div className="">
            <AddEditForm loading={loading} title="Add" setData={setData} />
        </div>
    )
}

export default Add
