import { useState, useEffect } from 'react'
import { Mail, Phone, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react'

export default function TeamSection() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/team')
      if (response.ok) {
        const data = await response.json()
        // Limit to 10 team members
        setTeam(data.slice(0, 10))
        setError('')
      } else {
        throw new Error('Failed to fetch team')
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      setError('Failed to load team members')
      // Use default team data if API fails
      setTeam([
        {
          _id: '1',
          name: "Faizan Ayubi",
          role: "Co-Founder & CEO",
          description: "A supportive team is the foundation of a successful company. At Trackier, we foster an environment where respect, collaboration, and growth come naturally.",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          _id: '2',
          name: "Udit Verma",
          role: "Co-Founder & CMO",
          description: "Understanding 'why' before taking action helps us serve our customers better. We strive to anticipate their needs and deliver solutions that exceed expectations.",
          image: "https://randomuser.me/api/portraits/men/44.jpg"
        },
        {
          _id: '3',
          name: "Mukul Kaushik",
          role: "Chief Revenue Officer",
          description: "A growth mindset is essential in today's fast paced world. We encourage our team to keep learning, adapting, and striving for excellence.",
          image: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
          _id: '4',
          name: "Abhay Chauhan",
          role: "Chief Technology Officer",
          description: "Technology should make work easier, not complicated. At Trackier, we focus on building reliable systems that help teams work faster and smarter.",
          image: "https://randomuser.me/api/portraits/men/50.jpg"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-24 px-6">
        <div className="text-center">
          <p className="text-gray-500">Loading team members...</p>
        </div>
      </div>
    )
  }

  
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 4
  }

  const itemsPerSlide = getItemsPerSlide()
  const totalSlides = Math.ceil(team.length / itemsPerSlide)

 
  const TeamCard = ({ member }) => (
    <div className="group relative h-full">
      
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      
        <div className="h-1 bg-[#1F2937]"></div>

   
        <div className="relative pt-8 pb-4 px-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-100 to-pink-100">
              <img
                src={member.imageData ? `data:image/jpeg;base64,${member.imageData}` : member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/96?text=' + member.name.charAt(0)
                }}
              />
            </div>
          </div>
        </div>

        
        <div className="flex-1 px-6 pb-6 text-center flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-sm font-semibold bg-[#E1A154] bg-clip-text text-transparent mb-3">{member.role}</p>
            <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{member.description}</p>
          </div>

          
          <div className="flex justify-center gap-2 pt-4 mt-4 border-t border-gray-100">
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Mail className="w-4 h-4" />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Phone className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks?.linkedin && (
              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks?.twitter && (
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks?.instagram && (
              <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks?.facebook && (
              <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all p-2 rounded-full">
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-[#1F2937] bg-clip-text text-transparent mb-4">Meet Our Team</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">Talented professionals dedicated to bringing your vision to life</p>
          <div className="w-16 h-1 bg-[#E1A154] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Slider Container */}
        <div className="max-w-7xl mx-auto">
       
          <div className="block sm:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {team.map((member) => (
                  <div key={member._id} className="w-full flex-shrink-0 px-2">
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden sm:block lg:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(team.length / 2) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {team.slice(slideIndex * 2, Math.min((slideIndex + 1) * 2, team.length)).map((member) => (
                        <div key={member._id} className="px-2">
                          <TeamCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      
          <div className="hidden lg:block">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(team.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-4 gap-6">
                      {team.slice(slideIndex * 4, Math.min((slideIndex + 1) * 4, team.length)).map((member) => (
                        <div key={member._id} className="px-2">
                          <TeamCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-10 md:mt-14">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                className="bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000] hover:from-[#000000] hover:to-[#000000] text-white rounded-full p-2.5 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index 
                        ? 'w-8 h-2.5 bg-[#3F322C]' 
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>



              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                className="bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000] hover:from-[#000000] hover:to-[#000000] text-white rounded-full p-2.5 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
