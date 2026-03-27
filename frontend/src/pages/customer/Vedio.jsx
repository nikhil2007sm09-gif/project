import { useState } from "react";
import Vedio from "../../img/VedioCloth.webp"


export default function FurnitureSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Side - Image */}
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left">
              Master the Art of Personal Styling
            </h1>

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
              <img
                src={Vedio}
                alt="Fashion styling guide"
                className="w-full h-auto object-cover drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">

            <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              Whether you're dressing for a big event or daily comfort, your wardrobe reflects who you are.
            </p>

            <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
              Your style is a language that speaks before you do. At Hi Clothe, we believe in creating timeless pieces that blend natural comfort with modern trends. Choosing the right outfit is about finding the balance between your personality and the occasion, ensuring you feel confident in every stitch.
            </p>

            <ul className="space-y-2 sm:space-y-3 text-gray-500 text-xs sm:text-sm md:text-base">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-orange-400 text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5">•</span>
                <span>Curate Your Signature Look: Select pieces that complement your unique body type and skin tone.</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-orange-400 text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5">•</span>
                <span>Eco-Friendly Fabrics: We prioritize natural materials that are soft on your skin and the planet.</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-orange-400 text-sm sm:text-base md:text-lg flex-shrink-0 mt-0.5">•</span>
                <span>Versatile Essentials: Build a capsule wardrobe with items that can be styled in multiple ways.</span>
              </li>
            </ul>

            {/* Video Card */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[80px] xl:rounded-[120px] overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 group"
            >

              <img
                src="https://woodmart.xtemos.com/furniture2/wp-content/uploads/sites/11/2023/04/wd-furniture-choosing-rules-video.jpg"
                alt="Fashion collection video"
                className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex flex-col items-center justify-center text-white text-center transition-all duration-300">

                <span className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mb-1 sm:mb-2">
                  How to Style Naturally
                </span>

                <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4">
                  Hi Clothe Summer Essentials '26
                </h2>

                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 border-white rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform duration-300 group-hover:bg-white/20">
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 ml-0.5 sm:ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
          >

            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-1 right-0 sm:-top-7 sm:-right-2 text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl z-10 bg-black/50 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors duration-200"
            >
              ✕
            </button>

            <video
              src="https://asset21.ckassets.com/wp/wp-content/themes/Cashkaro_SocialMedia/img/wel_v3.mp4"
              controls
              autoPlay
              onEnded={() => setIsVideoOpen(false)}
              className="w-full h-auto rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl"
            />

          </div>

        </div>
      )}
    </section>
  );
}