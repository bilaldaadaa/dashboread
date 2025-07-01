
import { useRef, useState, type ChangeEvent, type FormEvent, } from "react";
import { Link } from "react-router-dom";
import type { AuthFormProps } from "../../interfaces";

import Spinner from "../../assets/img/Spinner.gif"



const AuthForm = <T extends object>({ title, descriptions, inputs, footer, btn, setData, width, loading }: AuthFormProps<T>) => {
    const [image, setimage] = useState<string>('')
    const data = useRef<T>({} as T)
    const sendData = (event: FormEvent) => {
        event.preventDefault()

        setData(data.current)
        console.log(data)
    }
    const dataHandiling = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files, type } = event.target

        if (type == "file" && files?.[0]) {
            const file = files[0]
            setimage(URL.createObjectURL(file))
            data.current = { ...data.current, [name]: file }
        } else {
            data.current = { ...data.current, [name]: value }
        }
    }





    return (
        <form onSubmit={sendData} className="bg-[#FFFFFF]  rounded-2xl py-[22px] px-[32px] text-center w-[498px] min-h-[620px] flex flex-col items-center justify-between">
            <div className="">
                <div className="  mb-[32px]">
                    <h1 className="font-Nunito font-bold text-[32px] leading-[100%] mb-2 ">{title}</h1>
                    <p className=" opacity-80 font-Nunito font-semibold text-[16px] leading-[100%] ">{descriptions}</p>
                </div>
                <div className=" flex flex-wrap  gap-4 ">
                    {
                        inputs.map((input, index) => {
                            return (
                                <div className={`mb-[17px] inputs`} key={index}>
                                    <label className="opacity-80 block text-left font-Nunito font-semibold text-[14px] leading-[100%] mb-[4px] w-[200px]"
                                        htmlFor={`${index}`}>
                                        {input.type == "file" ? <p className=" block text-left font-Nunito font-semibold text-[14px] leading-[100%] mb-[4px]">Profile Image:</p> : <p className="hidden">profile image</p>}
                                        {input.type != "file" ? input.label : image != "" ? <img className="w-[50%] cursor-pointer h-[100px]" src={image} alt="" /> : <img className="bg-[#F8F8FF] w-[90px] h-[90px] px-4 py-4 border-2 border-dashed rounded-[4px] border-[#4880FF4D] cursor-pointer" src={input.label} alt="" />}
                                    </label>
                                    <input
                                        required
                                        className={`w-[${width}] outline-none border-1 border-[#D8D8D8] rounded-[6px]
                                        bg-[#F1F4F9] py-[13px] pl-[17px] ${input.type == "file" && "hidden "} `}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        id={`${index}`}
                                        onChange={dataHandiling}
                                    />
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <footer className="">
                <button type="submit" className=" mb-[8px] font-Nunito font-bold text-[16px] leading-[100%] text-white  cursor-pointer bg-[#4880FF] w-[434px] h-[50px] rounded-[8px] opacity-90 "> <span className="flex items-center justify-center">{loading ? <img className="w-[50px] h-[50px]" src={Spinner} alt="" /> : btn}</span></button>
                <p className="opacity-80 font-Nunito font-semibold text-[16px] leading-[100%] text-[#202224]">{footer.content} <Link className=" opacity-100 text-[#5A8CFF] underline decoration-[#5A8CFF]" to={footer.links.url}>{footer.links.content}</Link> </p>
            </footer>

        </form>
    )
}


export default AuthForm
