import  { memo } from "react";


export interface Service{
   icon : string;
   name : string;
   description : string;
}

const ServiceComponent = ({service} : {service : Service}) => {

    return(
        <div className="w-[300px] flex flex-col items-center bg-gray-50 gap-1 h-[300px] p-2 rounded-lg shadow shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105">
            <h1 className="text-[#1D4ED8] font-black text-[1.2em] text-center p-2">{service.name}</h1>
            <img src={service.icon} alt={service.name} className="w-[80px]"/>
            <p className="font-[600] text-gray-700 text-[0.9em] mt-5 text-center">
                {service.description}
            </p>
        </div>
    );
}

export default memo(ServiceComponent);

