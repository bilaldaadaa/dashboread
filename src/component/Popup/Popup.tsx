import type { PopUpProps } from "../../interfaces"

const Popup = ({ description, no, yes }: PopUpProps) => {
    return (
        <div className="w-screen h-full bg-[#00000080] top-1/2 left-1/2  translate-[-50%] absolute z-10  ">
            <div className=" dark:bg-gray-900  w-[600px] px-[147] py-[93px] rounded-[20px] absolute left-1/2 top-1/2  translate-[-50%] text-center bg-white ">
                <p className="text-black text-2xl dark:text-white font-semibold leading-[32.74px] mb-[53px] ">{description}</p>
                <div className="flex items-center justify-center gap-6">
                    <button className="w-[140px] h-[50px] rounded-sm cursor-pointer bg-[#EF3826] text-[18px] font-medium leading-[21.94px]" onClick={yes}>Yes</button>
                    <button className="w-[140px] h-[50px] rounded-sm cursor-pointer bg-[#4880FF] text-[18px] font-medium leading-[21.94px]" onClick={no}>no</button>
                </div>
            </div>
        </div >
    )
}

export default Popup

