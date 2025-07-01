import { useContext, useEffect, useState } from "react"
import { SearchContext } from "../context/Context"

import { IoMdAddCircleOutline } from "react-icons/io";
import ProductCard from "../component/ProductCard/ProductCard";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import type { productsData } from "../interfaces";
import axios from "axios";





const Items = () => {
    
    const serach = useContext(SearchContext)
    const nav = useNavigate()
    const [data, setData] = useState<Array<productsData>>(useLoaderData<Array<productsData>>())
    const [showData, setShowData] = useState<Array<productsData>>()
    const [deleted, setDeleted] = useState<number>(0)
    useEffect(() => {
        if (serach != "") {
            setShowData(data.filter(value => { return value.name.includes(serach) }))
        } else {
            setShowData(data)
        }
    }, [serach, data])
    const create = () => {
        nav("/dashbored/add")
    }

    useEffect(() => {
        if (deleted != 0) {
            axios.get("https://vica.website/api/items", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Accept": "application/json"
                }
            }).then(res => {
                console.log(res.data)
                setData(res.data)
            }).catch(err => console.log(err))
        }
    }, [deleted])
    /* 
        useEffect(() => {
            toast(`Hi  ${localStorage.getItem("UserName")} `)
        }, [location]) */


    return (
        <>
            <div className="p-[20px]">
                <div className="flex justify-between items-center mb-8 ">
                    <h1 className="text-[#44484c] dark:text-white font-semibold" >All Products</h1>
                    <button onClick={create} className=" text-white flex justify-center items-center gap-2 bg-cyan-900 w-[140px] h-[40px] cursor-pointer  "><IoMdAddCircleOutline />Create Product</button>
                </div>
                <div className="flex w-full flex-wrap justify-between items-center gap-[10px]  ">
                    {
                        showData?.map((produect) => {
                            return (
                                <ProductCard
                                    key={produect.id}
                                    id={produect.id}
                                    image_url={produect.image_url}
                                    name={produect.name}
                                    price={produect.price}
                                    setDeleted={setDeleted}
                                />
                            )
                        })
                    }

                </div>
            </div>

        </>
    )
}

export default Items
