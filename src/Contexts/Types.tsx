

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
    userId : string;
    userName : string;
    name : string;
    email : string;
    number : string;
    service : string;
    details : string;
    requestDate : string;
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

export interface Testimonial{
    picture : string;
    name : string;
    service : string;
    testimonial : string;
}