import { memo, useState } from "react";


  const faqs = [
  {
    question: "How much does property management cost?",
    answer: "Our fees are transparent and tailored to your property. Contact us for a personalized quote.",
  },
  {
    question: "Do you handle tenant screening?",
    answer: "Yes, we carefully vet tenants to ensure your property is in good hands.",
  },
  {
    question: "Can I book a free consultation before deciding?",
    answer: "Absolutely! We offer free consultations to help you understand how Homey can support your goals.",
  },
  {
    question: "What types of properties do you manage?",
    answer: "We manage a wide range of properties, from apartments and villas to commercial spaces.",
  },
  {
    question: "How do I get started with Homey?",
    answer: "Simply reach out through our contact form or phone number, and our team will guide you step by step.",
  },{
    question: "Do you help with property valuation?",
    answer: "Yes, we provide professional property valuation to help you understand the true market value of your asset.",
  },{
    question: "Do you help with property valuation?",
    answer: "Yes, we provide professional property valuation to help you understand the true market value of your asset.",
  },
];
const Faq = () => {

  
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return(
        <section className="flex flex-col items-center bg-white w-full" id="faq">
            <h1 className="text-[#1D4ED8] font-black text-[2.5em] mt-10">FAQ</h1>

             <p className="text-[#1D4ED8] font-bold text-[1em] mt-2">Got Questions? We’ve Got Answers.</p>
             <p className="w-[600px] text-gray-600 text-center mt-2 max-[650px]:w-[300px]">Here are some of the most common questions we receive about our services at Homey</p>

             <div className="flex flex-col mt-10 mb-15">
                  {faqs.map((faq, index) => (
            <div key={index} className=" bg-white w-[400px] shadow-2xl max-[450px]:w-[300px]">
              <button
                className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span className="text-[2em] font-light cursor-pointer">{openIndex === index ? "−" : "+"}</span>
              </button>
               <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 px-4 pb-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
            </div>
          ))}
             </div>
        </section>
    )
}

export default memo(Faq);