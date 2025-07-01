import { useEffect, useState } from "react"
import AddEditForm from "../component/AddEditForm/AddEditForm"
import type { dataAdd } from "../interfaces"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"


const Edit = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const params = useParams()
    const nav = useNavigate()
    const [data, setData] = useState<dataAdd>({
        name: "",
        price: "",
        image: null
    })
    const oldData = useLoaderData()

    useEffect(() => {
        if (data.name != '') {
            setLoading(true)
            axios.post("https://vica.website/api/items/" + params.id, { ...data, "_method": "PUT" }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res)
                toast.success(res.data.message)
                nav("/dashbored/items")
                setLoading(false)
            }).catch(err => {
                console.log(err)
                toast.error(err.data.message)
            })
        }
    }, [data])

    return (
        <div>
            <AddEditForm title="Edit" setData={setData} oldData={oldData} loading={loading} />
        </div>
    )
}

export default Edit

