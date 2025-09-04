import { memo } from "react"


const GeneralFooter = () => {
    
    return(
        <div className="w-full text-white flex justify-center items-center text-center h-[50px] gap-1 bottom-0 bg-gray-900">
            
                &#169; 2025 Homey. All rights reserved. Powered by Homey | Crafted with passion by Yanis.
           </div>
    )
}

export default memo(GeneralFooter);