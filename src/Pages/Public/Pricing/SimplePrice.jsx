import React from 'react';

const SimplePrice = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$29/mo",
      badge: "",
      features: [
        { text: "High-resolution image generation", included: true },
        { text: "Customizable style templates", included: true },
        { text: "Batch processing capabilities", included: true },
        { text: "AI-driven image enhancements", included: false },
        { text: "Seamless cloud integration", included: false },
        { text: "Real-time collaboration tools", included: false }
      ]
    },
    {
      name: "Business",
      price: "$79/mo",
      badge: "Most Popular",
      features: [
        { text: "High-resolution image generation", included: true },
        { text: "Customizable style templates", included: true },
        { text: "Batch processing capabilities", included: true },
        { text: "AI-driven image enhancements", included: true },
        { text: "Seamless cloud integration", included: true },
        { text: "Real-time collaboration tools", included: false }
      ]
    },
    {
      name: "Premium",
      price: "$129/mo",
      badge: "",
      features: [
        { text: "High-resolution image generation", included: true },
        { text: "Customizable style templates", included: true },
        { text: "Batch processing capabilities", included: true },
        { text: "AI-driven image enhancements", included: true },
        { text: "Seamless cloud integration", included: true },
        { text: "Real-time collaboration tools", included: true }
      ]
    }
  ];

  return (
    <div className='bg-black min-h-screen py-16 px-4 mt-[30px]'>
      <div className='max-w-7xl mx-auto'>
        <h3 className='gradient-text pt-10 pb-6 text-center text-4xl md:text-5xl font-bold'>Simple Pricing</h3>
        <p className='px-4 md:px-0 text-[#797979] text-lg md:text-xl text-center max-w-3xl mx-auto'>
          Try all the visual builder features for free. Upgrade to export the code only if you are satisfied.
        </p>

        <div className="pricing-cards flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 mt-12 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="card w-full max-w-md md:w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body p-6 md:p-8">
                {plan.badge && (
                  <span className="badge badge-warning badge-sm md:badge-md mb-4 w-fit">
                    {plan.badge}
                  </span>
                )}
                
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">{plan.name}</h2>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-bold">{plan.price}</span>
                    <p className="text-sm text-gray-500">billed monthly</p>
                  </div>
                </div>
                
                <ul className="mt-4 flex flex-col gap-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={!feature.included ? "opacity-50" : ""}>
                      {feature.included ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5 me-3 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5 me-3 inline-block text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={!feature.included ? "line-through" : ""}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <button className={`btn btn-block ${plan.badge ? 'btn-primary' : 'btn-outline'}`}>
                    {plan.badge ? 'Get Started' : 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimplePrice;