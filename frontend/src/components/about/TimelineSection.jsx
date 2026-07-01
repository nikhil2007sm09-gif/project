const TimelineSection = () => {
  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize e-commerce' },
    { year: '2021', title: '1000+ Vendors', description: 'Reached our first major milestone' },
    { year: '2022', title: 'International Expansion', description: 'Expanded to 10+ countries' },
    { year: '2023', title: '50K+ Customers', description: 'Built a thriving community' }
  ]

  return (
    <div className="bg-[#f3f2ee] py-16 sm:py-20 md:py-24 font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
            text-white text-xs sm:text-sm font-bold 
            px-3 sm:px-4 py-1.5 sm:py-2 
            rounded-full shadow-lg tracking-wide">
              MILESTONES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

            <span className="bg-clip-text text-transparent 
            bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
            drop-shadow-sm">
              Our Journey
            </span>

            <div className="h-1 w-24 mx-auto mt-3 
            rounded-full bg-gradient-to-r 
            from-orange-400 via-orange-500 to-[#3F322C] 
            shadow-md">
            </div>

          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Key milestones in our growth story
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 
        "
              >
                
                {/* Year Badge */}
                <div className="absolute -top-5 left-6 
                bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
                text-white px-5 py-1.5 
                rounded-full text-sm font-semibold 
                shadow-lg group-hover:scale-105 transition">
                  {milestone.year}
                </div>

                {/* Content */}
                <div className="mt-8">
                  
                  <h3 className="text-xl font-bold mb-3 
                  bg-clip-text text-transparent 
                  bg-gradient-to-r from-orange-400 to-[#3F322C]">
                    {milestone.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {milestone.description}
                  </p>

                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl 
                bg-gradient-to-r 
                from-orange-400/0 to-[#3F322C]/0 
                group-hover:from-orange-400/10 
                group-hover:to-[#3F322C]/10 
                transition duration-500">
                </div>

                {/* Line Connector */}
                {index < milestones.length - 1 && (
                  <div
                    className="hidden lg:block absolute 
                    top-1/2 left-full 
                    -translate-y-1/2 
                    w-20 h-[3px] 
                    bg-gradient-to-r from-orange-400 to-[#3F322C]"
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
