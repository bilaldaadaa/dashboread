import { PiUploadDuotone } from "react-icons/pi"
import type { AddEditFormProps, dataAdd } from "../../interfaces"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"


const AddEditForm = ({ title, setData, oldData, loading }: AddEditFormProps) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const newData = useRef<dataAdd>({
        name: "",
        price: "",
        image: null
    })
    const handelImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            newData.current = { ...newData.current, image: event.target.files?.[0] }
            setImageUrl(URL.createObjectURL(event.target.files?.[0]))
        }
    }

    const sendData = (event: FormEvent) => {
        event.preventDefault()
        setData(newData.current)
    }



    return (
        <form onSubmit={sendData} className="dark:text-white">
            <h1 className="mb-5 text-3xl ">{title}</h1>
            <div className=" flex items-center justify-between">
                <div className="">
                    <div className="mb-5">
                        <label className="block mb-2" htmlFor="name ">name of Produect :</label>
                        <input onChange={(event) => newData.current = { ...newData.current, name: event.target.value }} defaultValue={oldData?.name} className="border-2 border-black dark:border-gray-50 rounded-[10px] p-1" type="text" id="name" placeholder=" name of Produect :" required />
                    </div>
                    <div className="mb-5 ">
                        <label className="block mb-2" htmlFor="price"> price of Produect :</label>
                        <input onChange={(event) => newData.current = { ...newData.current, price: event.target.value }} defaultValue={oldData?.price} className="border-2 border-black dark:border-gray-50 rounded-[10px] p-1" required type="text" id="price" placeholder=" price of Produect :" />
                    </div>
                </div>
                <div className="">
                    <label htmlFor="image" className=" flex flex-col items-center justify-center w-[300px] h-[300px] border-2 border-dashed border-blue-400 cursor-pointer">{imageUrl != "" ? <img src={imageUrl} alt="" /> : oldData?.image_url ? <img className="w-[75%]" src={oldData?.image_url} alt="" /> : <PiUploadDuotone className="text-9xl" />} uplod the photo</label>
                    <input onChange={handelImage} type="file" id="image" className="hidden" required />
                </div>
            </div>
            <button type="submit" className="cursor-pointer bg-blue-900 w-[150px] h-[50px] text-white rounded-2xl " ><span className="flex items-center justify-center">{loading ? <img className="w-[50px] h-[50px]" src="/public/assets/img/Spinner.gif" alt="" /> : oldData ? "update" : "create"}</span></button>
        </form>
    )
}

export default AddEditForm
