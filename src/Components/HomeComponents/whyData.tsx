

export interface whyDataType{
    icon : string;
    name : string;
    text : string;
}

const whyData : whyDataType[] = [
    {
        icon : "/icons/trust.svg",
        name: "Transparency & Trust",
        text : "We keep you informed at every step, with no hidden surprises."
    },{
        icon : "/icons/solutions.svg",
        name: "Tailored Solutions",
        text : "Every property is unique, and so is our approach."
    },{
        icon : "/icons/support.svg",
        name: "Complete Support",
        text : "From free consultations to full management, we’ve got you covered."
    },{
        icon : "/icons/expertise.svg",
        name: "Proven Expertise",
        text : "Years of experience in helping clients maximize their investments."
    }
];

export default whyData;