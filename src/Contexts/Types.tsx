

export interface Propertie{
    id : string;
    title : string;
    description : string;
    price : number;
    rooms : number;
    surface : number;
    status : string;
    type : string;
    service : string;
    location : {
        city : string;
        address : string;
    }
    features : string[];
    images : string[];
    agentNumber : string;
}

export interface Request{
    id : string;
    name : string;
    userId : string;
    email : string;
    propertie : Propertie;
    requestDescription : string;
    status : string;
}
export interface User{
    id : string;
    name : string;
    email : string;
    favorites : Propertie[];
    requests : Request[];
    role : string;
}

export interface Filter{
    type : string;
    city : string;
    service : string;
}