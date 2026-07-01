import React from 'react';
import founderImg from '../../assets/images/Founder.png';

const FounderMessage = () => {
  return (
    <div className=" bg-[#f3f2ee] flex items-center justify-center p-6 md:p-12 font-sans selection:bg-orange-200">
      <div className="w-full ">
        
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e40] tracking-wide">
            A Message From <span className="text-[#f97316]">Our Founder</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-3 font-medium tracking-wider uppercase">
            The Vision, The Passion. The Purpose behind ELVORA Fashion
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-3 rounded-t-full bg-gradient-to-b from-yellow-200/60 via-yellow-100/30 to-transparent shadow-[0_-10px_25px_rgba(250,204,21,0.2)] max-w-[340px] md:max-w-[380px] w-full">
              <div className="overflow-hidden rounded-t-full bg-[#fde047]/20 border border-yellow-300/30">
                <img 
                  src={founderImg} 
                  alt="Dr. Nikhil Sharma" 
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-gray-700 text-sm md:text-base leading-relaxed text-justify lg:text-left">
            <div>
              <div className="w-16 h-[3px] bg-[#f97316] mb-4"></div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-950">Dr. Nikhil Sharma</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-600 mt-1">
                Founder of ELVORA Fashion
              </p>
            </div>

            <p className="italic font-medium text-gray-800">
              My team once asked me, "Why ELVORA?" I replied because we believe in crafting trends, not just following them.
            </p>

            <p>
              At ELVORA Fashion, we believe that clothing is not just about fabric—it's a statement of confidence, identity, and elegance. By leveraging modern digital tools alongside premium craftsmanship, we help individuals redefine their personal style and stay ahead of the style curve, transforming everyday wardrobe choices into an premium lifestyle experience.
            </p>

            <p>
              Whether you are looking for classic sophistication or modern streetwear, we envision providing an all-inclusive style destination for everyone. We understand that in today’s dynamic fashion world, people need trendsetting designs, personalized choices, and a brand that truly complements their persona.
            </p>

            <p>
              The core idea behind the ELVORA initiative was to deliver high-quality, tech-driven, and contemporary fashion accessible to all. Merging a background in technology with a passion for creative design, our platform aims to empower style enthusiasts and shoppers alike to express themselves effortlessly with minimal hassle. I welcome you all to join us in this exciting journey where lifestyle meets perfection.
            </p>

            <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <p className="font-bold text-gray-900">---Dr. Nikhil Sharma</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  (BCA)
                </p>
              </div>
       
              <div className="text-3xl md:text-4xl text-[#c29d70] font-serif italic tracking-wide select-none self-end md:self-auto">
                Nikhil Sharma
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FounderMessage;