
import { CiTrash } from "react-icons/ci"
import type { cardProductProps } from "../../interfaces"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import Popup from "../Popup/Popup"



const ProductCard = ({ image_url, name, price, id, setDeleted }: cardProductProps) => {
    const [isOpne, setIsOpen] = useState(false)
    const nav = useNavigate()

    const goToEdit = () => {
        nav(`/dashbored/edit/${id}`)
    }

    const opnePopUp = () => {
        setIsOpen(true)
    }
    const closePopUp = () => {
        setIsOpen(false)
    }
    const deleteItem = () => {
        axios.delete(`https://vica.website/api/items/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
                "Accept": "application/json"
            }
        }).then(res => {
            console.log(res)
            if (setDeleted) {
                setDeleted(id)
                toast.success(res.data.message)
                console.log(id)
            }
        })
            .catch(err => {
                console.log(err)
                toast.error(err.data.message)
            })
    }


    return (

        <div className="w-[250px] dark:text-white h-[290px] dark:bg-[#202224] rounded-2xl p-3 "  >
            <img src={image_url} className=" max-w-[100%]  my-0 mb-[25px] mx-auto  rounded-xl h-[150px] " alt="Product Image" />
            <div className="">
                <h2 className="mb-[5px]">{name}</h2>
                <span className="mb-[5px] block">{price} $ </span>
                <div className="flex justify-between items-center">
                    <button onClick={goToEdit} className="cursor-pointer border-2 border-[#202224] dark:border-white p-1 rounded-2xl ">edit Product</button>
                    <CiTrash onClick={opnePopUp} className="text-2xl cursor-pointer" />
                    {
                        isOpne && <Popup description="Are you sure you want to delete this produect" yes={deleteItem} no={closePopUp} />
                    }
                </div>
            </div>
        </div>

    )
}

export default ProductCard
